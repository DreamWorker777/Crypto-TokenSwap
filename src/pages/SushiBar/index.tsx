import { Paper } from 'kashi'
import React, {useContext, useState, useEffect, useCallback} from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useActiveWeb3React } from '../../hooks'
import AppBody from '../AppBody'
import SushiDepositPanel from './SushiDepositPanel'
import XSushiWithdrawlPanel from './XSushiWithdrawlPanel'
import { CardSection, DataCard } from '../../components/earn/styled'
import { RowBetween } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
import { TYPE, ExternalLink } from '../../theme'
import { transparentize } from 'polished'
import closeLogo from "../../assets/images/X.png";
import styled, { ThemeContext } from 'styled-components'
import useTokenBalance from 'sushi-hooks/useTokenBalance'
import { formatFromBalance, formatToBalance } from '../../utils'

// import SaaveHeader from './SushiBarHeader'
import { Wrapper } from '../../components/swap/styleds'

import StakeDepositPanel from './StakeDepositPanel'
import BuryWithdrawlPanel from './BuryWithdrawlPanel'
import useBury from 'hooks/useBury'

export interface BalanceProps {
  value: BigNumber
  decimals: number
}

const PageWrapper = styled(AutoColumn)`
  max-width: 420px;
  width: 100%;
`

const VoteCard = styled(DataCard)`
  background: ${({ theme }) => transparentize(0.5, theme.bg1)};
  overflow: hidden;
  margin-bottom: 10px;
`

const BurySection = styled.div`
  width: 70%;
  height: auto;
  // border:2px solid white;
  box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.43);
  border-radius: 10px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(17, 20, 27, 0.33) 31%, rgba(17, 20, 27, 0.5) 100%);
 
  @media (max-width: 500px) {
    text-align: center;
    width: 100%;
  }
`
const CloseIcon = styled.div`
  width:28px;
  height:30px;
  opacity: 0.24;
  background-repeat: no-repeat;
  float:right;
  position:relative;
  right:7px;
  top:5px;
  cursor:pointer;
  display:block;
`

const BoxContainer = styled.div`
  width: 90%;
  height:auto;
  margin: auto;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    text-align: center;
    display: block;
  }
`

const BoxSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 88px;
  box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #292c37;

  @media (max-width: 800px) {
    text-align: center;
    width: 100%;
    margin-top: 10px;
  }
`;

const StakeSection = styled.div`
  width: 70%;
  height: auto;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;
  box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #292c37;
  text-align: center;

  @media (max-width: 800px) {
    text-align: center;
    width: 95%;
  }
`;

const StakeButton = styled.div`
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  font-family: Metric - Bold;
  letter-spacing: 0.1px;
  line-height: normal;
  float:right;
  margin: 10px 10px;
  cursor: pointer;
`
const ClaimContainer = styled.div`
  width:90%;
  height:auto;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.45);
  background-color: #161825;
  opacity: 0.76;
  border-color: #161825;
  //border: 2px solid white;
  //padding: 10px;
  
  @media (max-width: 600px) {
    // display: block;
    padding-bottom: 3px;
  }

`;

const ClaimFirstSection = styled.div`
  display: inline-block;
  width: 60%;
  height:auto;
  margin: auto;
  margin-top:10px;
  //border: 2px solid white;
  //float:left;
  text-align:left;
  //padding:10px;
  //border-right: 1px solid rgba(255, 255, 255, .2);
  
  
  @media (max-width: 600px) {
    text-align: left;
    display: block;
    //float:center;
    margin:auto;
    height:auto !important;
    width:100%;
  }
`;

const ClaimSecondSection = styled.div`
  display: inline-block;
  width: 40%;
  height:auto;
  //border: 2px solid white;
  float:right;
  text-align: left;
  margin-top:4px;
  //border-left: 0.5px solid #d5d5d5;
  border-left: 1px solid rgba(255, 255, 255, .2);
  //position:relative;
  //top:-15px;
  padding-left:5px;
  @media (max-width: 600px) {
    text-align: left;
    display: block;
    float:none;
    margin:auto;
    height:auto;
    width:100%;
    border-left: none;
    top: 0px;
    padding-left:0;
  }
`;

const ClaimButton = styled.div`
  width: 80px;
  height: auto;
  line-height: 40px;
  border-radius: 10px;
  background-color: #292c37;
  text-align: center;
  float: right;
  position:relative;
  //top:10px;
  //right:10px;
  //left:50px;
  cursor: pointer;
  line-height: 35px;
  font-weight: 500;
  margin-top: 20px ;


  @media (max-width: 600px) {
    top: 0px;
    left:0;
    float:none;
  }
`;


export default function SushiBar(props:any) {
  
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  //const darkMode = useDarkModeManager()

  let state = props.location.state;
  let tokenType = state && state.tokenType;
  let tokenAddress = state && state.tokenAddress;
  let buryTokenAddress = state && state.buryTokenAddress;

  const [isStakeSelected, setIsStakeSelected] = useState(true);
  const {leave} = useBury({tokenType,tokenAddress});  

  function handleStakeSelect(selectedKey:string){
    setIsStakeSelected(selectedKey === "Stake");
  }

  return (
    <>
      <BurySection className="m-auto">
      {/* <CloseIcon style={{backgroundImage:"url(" + closeLogo + ")"}}/> */}
      
      <BoxContainer>
        <BoxSection>
          <TYPE.white fontWeight={500} fontSize={"18px"}>Total Value Locked</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={"21px"} font-Style={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
        <BoxSection>
          <TYPE.white fontWeight={500} fontSize={"18px"}>Your Portfolio</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={"21px"} font-Style={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
        <BoxSection>
          <TYPE.white fontWeight={500} fontSize={"18px"}>Token Price</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={"21px"} font-Style={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
      </BoxContainer>

      <StakeSection>

      <StakeButton onClick={()=>{handleStakeSelect("Unstake")}} style={{color: !isStakeSelected?"#fea31c":"", marginRight:"45px" }}>Unstake</StakeButton>
      <StakeButton onClick={()=>{handleStakeSelect("Stake")}} style={{color: isStakeSelected?"#fea31c":""}}>Stake</StakeButton>
      <br></br>

       { 
       isStakeSelected ?
        <StakeDepositPanel
          tokenType={tokenType}
          tokenAddress={tokenAddress}
        />
        :
        <BuryWithdrawlPanel
          tokenType={tokenType}
          tokenAddress={buryTokenAddress}
        />
       }
      
      <ClaimContainer>
        <ClaimFirstSection>
          <div style={{paddingLeft:"15px",margin:"20px"}}> 
          <TYPE.white fontWeight={500} fontSize={16}>Your staked amount - $1000</TYPE.white>
          <TYPE.white fontWeight={500} fontSize={16}>Available-</TYPE.white>
          <TYPE.white fontWeight={500} fontSize={16}>Yearly ROI - 0,00%</TYPE.white>
          <TYPE.white fontWeight={500} fontSize={16}>Value - $0.000</TYPE.white>
          </div>
        </ClaimFirstSection>
        
        <ClaimSecondSection>
        <div style={{marginLeft:"15px",margin:"20px"}}>
          <TYPE.white fontWeight={500} fontSize={16}>Rewards - $0.000</TYPE.white>
          <TYPE.white fontWeight={500} fontSize={16}>Available date:</TYPE.white>
          <ClaimButton
          //  disabled={
          //  // TODO: write relevant condition
          //  false
          //   }
            onClick={async () => {
            // setPendingTx(true)
            // TOOO: decimal should not be hardcoded
              let balance = { value: BigNumber.from(0), decimals: 18 }
                await leave(balance)
            // setPendingTx(false)
            }}
             >
          <TYPE.white fontWeight={500} fontSize={18} font-Style={"Metric - Bold"}>CLAIM</TYPE.white>
        </ClaimButton>
        </div>
        
        </ClaimSecondSection>
      </ClaimContainer>

      <div style={{width:"100%", height:"20px"}}>

      </div>
      </StakeSection>

      </BurySection>

      {/* <PageWrapper>
    <VoteCard>
    <CardSection>
    <AutoColumn gap="md">
    <RowBetween>
    <TYPE.white fontWeight={600} color={theme.text1}>
    SushiBar: Make SUSHI work for you
    </TYPE.white>
    </RowBetween>
    <RowBetween>
    <div>
    <TYPE.white fontSize={14} color={theme.text2} style={{ paddingBottom: '10px' }}>
    {`Stake your SUSHI into xSUSHI for ~15% APY. No impermanent loss, no loss of governance rights. Continuously compounding.`}
    </TYPE.white>
    <TYPE.white fontSize={14} color={theme.text2} style={{ paddingBottom: '10px' }}>
    {`xSUSHI automatically earn fees (0.05% of all swaps, including multichain swaps) proportional to your share of the SushiBar.`}
    </TYPE.white>
    </div>
    </RowBetween>
    <ExternalLink
    style={{ color: 'white', textDecoration: 'underline' }}
    target="_blank"
    href="https://analytics.sushi.com/bar"
    >
    <TYPE.white fontSize={14} color={theme.text1}>
    View SushiBar Stats <span style={{ fontSize: '11px' }}>넇</span>
    </TYPE.white>
    </ExternalLink>
    {account && (
    <ExternalLink
    style={{ color: 'white', textDecoration: 'underline' }}
    target="_blank"
    href={'http://analytics.sushi.com/users/' + account}
    >
    <TYPE.white fontSize={14} color={theme.text1}>
    View your SushiBar Portfolio <span style={{ fontSize: '11px' }}>넇</span>
    </TYPE.white>
    </ExternalLink>
    )}
    </AutoColumn>
    </CardSection>
    </VoteCard>
    <AppBody>
    <Wrapper id="swap-page">
    <AutoColumn style={{ paddingBottom: '10px' }}>
    <SushiDepositPanel
    label={''}
    disableCurrencySelect={true}
    customBalanceText={'Available to deposit: '}
    id="stake-liquidity-token"
    buttonText="Deposit"
    cornerRadiusBottomNone={true}
    />
    <XSushiWithdrawlPanel
    label={''}
    disableCurrencySelect={true}
    customBalanceText={'Available to withdraw: '}
    id="withdraw-liquidity-token"
    buttonText="Withdraw"
    cornerRadiusTopNone={true}
    />
    </AutoColumn>
    </Wrapper>
    </AppBody>
    </PageWrapper> */}

      
    </>
  )
}
