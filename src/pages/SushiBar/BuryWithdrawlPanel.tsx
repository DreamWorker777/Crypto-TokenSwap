import { Pair } from '@shibaswap/sdk'
import { Input as NumericalInput } from 'components/NumericalInput'
import { RowBetween } from 'components/Row'
import { useActiveWeb3React } from 'hooks'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import useSushiBar from 'hooks/useSushiBar'
import useTokenBalance from 'sushi-hooks/useTokenBalance'
import useShibaSwapTokenBalance from 'shiba-hooks/useShibaSwapTokenBalance'
import { formatFromBalance, formatToBalance } from '../../utils'
import { TYPE } from '../../theme'

import useBury from 'hooks/useBury'

const PercentContainer = styled.div`
  width:95%;
  height:auto;
  // border:2px solid white;
  display:inline-block;
  margin:auto;
  margin-left:10px;
  padding-left:10px;
  padding-right: 10px;

  @media (max-width: 500px) {
    text-align: center;
    display: block;
  }
`;

const PercentAvailable = styled.div`
  color: white;
  margin: 5px;
  display: inline-block;
  float:right;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
  font-family: 'Heebo' !important;
  @media (max-width: 610px) {
    text-align: left;
    display: block;
    width:100%;
  }
`;

const Percent = styled.div`
  color: white;
  margin: 5px;
  display: inline-block;
  float:right;
  cursor: pointer;
  font-family: 'Heebo' !important;
  font-weight: 800;
    font-size: 18px;
  @media (max-width: 500px) {
    text-align: center;
    display: block;
  }
`;

const Input = styled.input<{ error?: boolean }>`
  width:90%;
  height:60px;
  margin: auto;
  margin-top: 0px;
  box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  background-color: #161825;
  opacity: 0.76;
  border-color: #161825;
  font-family: 'Heebo' !important;
`;

const ButtonSelect = styled.button`
  width:90%;
  height:52px;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #d5d5d5;
  text-align: center;
  color: #292c37;
  line-height: 60px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 15px;
  font-family: "Metric - Semibold"
`;


export default function BuryWithdrawlPanel(props:any){
    const { t } = useTranslation()
    const { account } = useActiveWeb3React()
    //const darkMode = useDarkModeManager()

    
    let tokenType = props.tokenType;
    let tokenAddress = props.tokenAddress;

    //Token Balance
    const buryBalanceBigInt = useShibaSwapTokenBalance(tokenAddress ? tokenAddress : '');
    const buryBalanceValue = parseFloat(formatFromBalance(buryBalanceBigInt?.value, buryBalanceBigInt?.decimals));
    const decimals = buryBalanceBigInt?.decimals;

    const maxDepositAmountInput = buryBalanceBigInt

    const {allowance, approve, leave} = useBury({tokenType,tokenAddress});

    const [activePercent, setActivePercent] = useState("");
    const [shibaBalance, setShibaBalance] = useState(0);
    const [input, setInput] = useState("");
  
    //Token
    const [requestedApproval, setRequestedApproval] = useState(false)
    const [pendingTx, setPendingTx] = useState(false)

    function handlePercentSelect(selectedPercentKey: string){
        setActivePercent(selectedPercentKey);
        let percentVal = parseFloat(selectedPercentKey)*buryBalanceValue/100;
        setInput(String(percentVal));
    }

    function handleInputChange(event:any){
        setInput(event.target.value);
    }
    
    function handleInputClick(){
        setActivePercent("");
    }
    

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            const txHash = await approve()
            // user rejected tx or didn't go thru
            if (!txHash) {
                setRequestedApproval(false)
            }
        } catch (e) {
            console.log(e)
        }
    }, [approve, setRequestedApproval])


    return (
        <>
        <div>   
            <PercentContainer>
            <PercentAvailable style={{float:'left'}}>Available: {buryBalanceValue ? buryBalanceValue : buryBalanceBigInt.isLoading ? 'Loading...': 0 }</PercentAvailable> 
            <Percent style={{color: (activePercent === "100")?"#fea31c":"", marginRight:"20px"}} onClick={()=>{handlePercentSelect("100")}}>100%</Percent>
            <Percent style={{color: (activePercent === "75")?"#fea31c":""}} onClick={()=>{handlePercentSelect("75")}}>75%</Percent>
            <Percent style={{color: (activePercent === "50")?"#fea31c":""}} onClick={()=>{handlePercentSelect("50")}}>50%</Percent>
            <Percent style={{color: (activePercent === "25")?"#fea31c":""}} onClick={()=>{handlePercentSelect("25")}}>25%</Percent>
            </PercentContainer>
            
            <Input
                className="recipient-address-input italic"
                //type="number"
                type="number"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="Type an amount to unstake"
                onChange={(event)=>{handleInputChange(event)}}
                onClick={()=>handleInputClick()}
                value={input}
            /> 
            
            {
            !allowance || Number(allowance) === 0 ? 
                <ButtonSelect disabled={requestedApproval} onClick={()=>{handleApprove()}}>  
                    <TYPE.white fontWeight={700} fontSize={"1rem"} color={"black"}>Approve</TYPE.white>
                </ButtonSelect>
            :
                <ButtonSelect 
                    disabled={
                    pendingTx ||
                    !buryBalanceValue ||
                    Number(input) === 0 ||
                    Number(input) > Number(buryBalanceValue)
                    }
                    onClick={async () => {
                    setPendingTx(true)
                    if (activePercent === "100") {
                        await leave(maxDepositAmountInput)
                    } else {
                        await leave(formatToBalance(input, decimals))
                    }
                    setInput("");
                    setPendingTx(false)
                    }}
                >
                    <TYPE.white fontWeight={700} fontSize={"1rem"} color={"black"}>Unstake</TYPE.white>
                </ButtonSelect> 
            } 
              </div>  
        
        
        </>
    )
}
