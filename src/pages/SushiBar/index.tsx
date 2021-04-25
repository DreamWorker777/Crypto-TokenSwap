import { Paper } from 'kashi'
import React, {useContext} from 'react'
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
  width: 60%;
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

// const ButtonContainer = styled.div`
//   display: block;
//   width:auto;
//   heigth: auto;
//   margin-bottom: 15px;
//   border: 2px solid white;
// `;

const StakeButton = styled.div`
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.1px;
  line-height: normal;
  float:right;
  margin: 10px 10px;
  cursor: pointer;
`
const PercentContainer = styled.div`
  width:95%;
  height:auto;
  // border:2px solid white;
  display:inline-block;
  margin:auto;
  margin-left:10px;
  margin-top:20px;
  padding-left:10px;
  padding-right: 10px;

  @media (max-width: 500px) {
    text-align: center;
    display: block;
  }
`;

const Percent = styled.div`
  color: white;
  margin: 5px;
  display: inline-block;
  float:right;
  cursor: pointer;
  font-style: Metric - Regular;
  @media (max-width: 500px) {
    text-align: center;
    display: block;
  }
`;

const Input = styled.input<{ error?: boolean }>`
  width:90%;
  height:60px;
  margin: auto;
  margin-top: 20px;
  box-shadow: inset 0 0 7px 1px rgba(0, 0, 0, 0.45);
  border-radius: 10px;
  background-color: #161825;
  opacity: 0.76;
  border-color: #161825;
  
`;

const StakeMainButton = styled.div`
  width:90%;
  height:60px;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #d5d5d5;
  text-align: center;
  color: #292c37;
  line-height: 60px;
  cursor: pointer;
`;

const ClaimContainer = styled.div`
  width:90%;
  height:200px;
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
  }

`;

const ClaimFirstSection = styled.div`
  display: inline-block;
  width: 60%;
  height:80%;
  margin: auto;
  margin-top:20px;
  //border: 2px solid white;
  float:left;
  text-align:left;
  //padding:10px;
  
  
  @media (max-width: 600px) {
    text-align: left;
    display: block;
    float:center;
    margin:auto;
    height:50%;
    width:100%;
  }
`;

const ClaimBorder = styled.div`
  width: 0%;
  height: 109px;
  background-color: #d5d5d5;
  opacity: 0.15;
`;

const ClaimSecondSection = styled.div`
  display: inline-block;
  width: 40%;
  height:80%;
  //border: 2px solid white;
  float:right;
  text-align: left;
  margin-top:20px;
  border-left: 0.5px solid #d5d5d5;

  @media (max-width: 600px) {
    text-align: left;
    display: block;
    float:center;
    margin:auto;
    height:50%;
    width:100%;
    border-left: none;
  }
`;

const ClaimButton = styled.div`
  width: 120px;
  height: 44px;
  line-height: 40px;
  border-radius: 10px;
  background-color: #292c37;
  text-align: center;
  float: right;
  position:relative;
  top:60px;
  right:10px;
  cursor: pointer;

  @media (max-width: 600px) {
    top: 0px;
  }
`;

export default function SushiBar() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  //const darkMode = useDarkModeManager()

  return (
    <>
      <BurySection>
      <CloseIcon style={{backgroundImage:"url(" + closeLogo + ")"}}/>
      
      <BoxContainer>
        <BoxSection>
          <TYPE.white fontWeight={500} fontFamily={"Metric - Medium"}>Total Value Locked</TYPE.white>
          <TYPE.white fontWeight={700} fontFamily={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
        <BoxSection>
          <TYPE.white fontWeight={500} fontFamily={"Metric - Medium"}>Your Portfolio</TYPE.white>
          <TYPE.white fontWeight={700} fontFamily={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
        <BoxSection>
          <TYPE.white fontWeight={500} fontFamily={"Metric - Medium"}>Token Price</TYPE.white>
          <TYPE.white fontWeight={700} fontFamily={"Metric - Bold"}>$000,000,000.000</TYPE.white>
        </BoxSection>
      </BoxContainer>

      <StakeSection>


      <StakeButton>Unstake</StakeButton>
      <StakeButton style={{color: "#fea31c"}}>Stake</StakeButton>
      <br></br>
      <PercentContainer>
      <Percent style={{float:'left'}}>Available: 0.0000000000</Percent>
      <Percent>100%</Percent>
      <Percent>75%</Percent>
      <Percent>50%</Percent>
      <Percent>25%</Percent>
      </PercentContainer>

      <Input
        className="recipient-address-input"
        type="text"
        placeholder="Type an amount to stake"
      />

      <StakeMainButton>
        <TYPE.white fontWeight={700} color={"black"}>Stake</TYPE.white>
      </StakeMainButton>

      <ClaimContainer>
        <ClaimFirstSection>
          <div style={{paddingLeft:"15px"}}> 
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Your staked amount - $000,000,000.000</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Available-</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Yearly ROI - 0,00%</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Value - $0.000</TYPE.white>
          </div>
        </ClaimFirstSection>
        
        <ClaimSecondSection>
        <div style={{marginLeft:"15px"}}>
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Rewards - $0.000</TYPE.white>
          <TYPE.white fontWeight={700} fontSize={14} font-Style={"Metric - Medium"}>Available date:</TYPE.white>
          <ClaimButton>
          <TYPE.white fontWeight={700}>Claim</TYPE.white>
        </ClaimButton>
        </div>
        
        </ClaimSecondSection>
      </ClaimContainer>

      <div style={{width:"100%", height:"20px"}}>

      </div>
      </StakeSection>

      </BurySection>


      
    </>
  )
}
