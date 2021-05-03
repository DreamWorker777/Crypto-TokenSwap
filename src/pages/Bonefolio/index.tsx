import React from 'react'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import trophyLogo from "../../assets/images/trophy.png";
import shibIcon from "../../assets/images/shibIcon.png";
import leashIcon from "../../assets/images/leashIcon.png";
import boneIcon from "../../assets/images/boneIcon.png";

export default function Bonefolio(props:any) {

    const BonefolioContainer = styled.div`
        display: inline-flex;
        width: 80%;
        height: 600px;
        //border: 2px solid white;
        text-align: center

        @media(max-width: 1200px){
            display: block;
            height: 100%;
        }

        @media(max-width: 500px){
            display: block;
            width: 100%;
            height: 100%;
        }
    `;

    const BoneSection = styled.div`
        display: inline-block;
        width:40%;
        height:auto;
        //border: 2px solid white;
        margin:auto;

        box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.43);
        border-radius: 10px;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(17, 20, 27, 0.33) 31%, rgba(17, 20, 27, 0.5) 100%);

        @media(max-width: 1200px){
            //display:block;
            width:100%;
        }
    `;

    const ChartSection = styled.div`
        display: inline-block;
        width:40%;
        height:95%;
        //border: 2px solid white;
        margin:auto;
        float: right

        @media(max-width: 1200px){
            //display: block;
            width:100%;
        }
    `;

    const BoneHeaderSection = styled.div`
        width: 100%;
        height: 70px;
        //border: 2px solid white;
        
    `;

    const CardHeading = styled.h1`
        display: inline-block;
        font-size: 2.3rem;
        text-align: left;
        font-weight: 700;
        color: #d5d5d5;
        margin: 0;
        font-family: "Metric - Bold";
        line-height: normal;
        font-style: normal;
        letter-spacing: 0.3px;
        padding-top: 0.6rem;
        // padding-bottom: 0.4rem;
        padding-left: 0.8rem;
        float:left;
    `
    const TrophySection = styled.div`
        display: inline-block;
        width:73px;
        height: 100%;
        float: right;
        //border: 2px solid white;
        box-shadow: inset 0 0 9px rgba(13, 13, 13, 0.43);
        border-radius: 10px;
        background-color: #1b1d2a;
        margin-top: 0.6rem;
        margin-right: 0.8rem;

        @media(max-width:600px){
            margin:0rem;
            
        }
    `;

    const TrophyIcon = styled.div`
        width:100%;
        height:100%;
        //opacity: 0.76;
        background-image: url(${trophyLogo});
        background-repeat: no-repeat;
        background-position: center;
    `;

    const BarContainer = styled.div`
        width: 100%;
        height: auto;
        margin-top:20px;
        //border: 2px solid white;
    `;

    const BarSection = styled.div`
        width: 80%;
        height: auto;
        border: 2px solid white;
        margin:auto;
        box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        border: 1px solid #30333e;
        background-color: #30333e;
        //border: 2px solid white;
        // opacity: 0.7;
        margin-top: 10px;

        @media(max-width:600px){
            width:100%
        }
    `;

    const TitleBarContainer = styled.div`
        width:100%;
        height:50px;
        //border: 2px solid white;
    `;

    const TitleIcon = styled.div`
        display: inline-block;
        width:60px;
        height: 100%;
        float: left;
        //border: 2px solid white;
        background-repeat: no-repeat;
        background-position: center;
    `;

    const TokenTitle = styled.h1`
        display: inline-block;
        width:auto;
        height: 100%;
        //border: 2px solid white;
        float:left;
        font-style: normal;
        letter-spacing: 0.2px;
        line-height: 3.5rem;
        font-family: "Metric - Semibold";
        font-size: 35px;
        font-weight: 700;
        color: white;
    `;

    const TextSection = styled.h1`
        display: inline-block;
        width:auto;
        height: 100%;
        //border: 2px solid white;
        line-height: 3rem;
        padding-right: 10px;
        font-size: 15px;
        font-family: "Metric - Semibold";
    `;

    const DescriptionSection = styled.div`
        width:100%;
        height:90px;
        //border: 2px solid green;
        margin-top: 5px;
    `;

    const DetailSection = styled.div`
        width:100%;
        height:25%;
       // border: 2px solid white;
    `;





    return(
        <BonefolioContainer>
            <BoneSection>
                <BoneHeaderSection>
                <CardHeading>BONEFOLIO</CardHeading>
                <TrophySection>
                    <TrophyIcon/>
                </TrophySection>
                </BoneHeaderSection>
                <BarContainer>
                    <BarSection>
                        <TitleBarContainer>
                            <TitleIcon style={{backgroundImage:"url(" + shibIcon + ")"}}/>
                            <TokenTitle>SHIB</TokenTitle>
                            <TextSection style={{float:"right"}}>Amount: 1,000,000</TextSection>
                        </TitleBarContainer>
                        <DescriptionSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Staked:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>5,000,000</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Pool Share:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>0</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Available rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>300</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px", color:"#7d2121"}}>Locked rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem", color:"#7d2121"}}>600</TextSection>
                            </DetailSection>
                        </DescriptionSection>
                    </BarSection>
                    <BarSection>
                        <TitleBarContainer>
                            <TitleIcon style={{backgroundImage:"url(" + leashIcon + ")"}}/>
                            <TokenTitle>LEASH</TokenTitle>
                            <TextSection style={{float:"right"}}>Amount: 1,000,000</TextSection>
                        </TitleBarContainer>
                        <DescriptionSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Staked:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>5,000,000</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Pool Share:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>0</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Available rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>300</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px", color:"#7d2121"}}>Locked rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem", color:"#7d2121"}}>600</TextSection>
                            </DetailSection>
                        </DescriptionSection>
                    </BarSection>
                    <BarSection>
                        <TitleBarContainer>
                            <TitleIcon style={{backgroundImage:"url(" + boneIcon + ")"}}/>
                            <TokenTitle>BONE</TokenTitle>
                            <TextSection style={{float:"right"}}>Amount: 1,000,000</TextSection>
                        </TitleBarContainer>
                        <DescriptionSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Staked:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>5,000,000</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Pool Share:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>0</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px"}}>Available rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem"}}>300</TextSection>
                            </DetailSection>
                            <DetailSection>
                                <TextSection style={{float:"left", lineHeight:"1.2rem", marginLeft:"10px", color:"#7d2121"}}>Locked rewards:</TextSection>
                                <TextSection style={{float:"right", lineHeight:"1.2rem", color:"#7d2121"}}>600</TextSection>
                            </DetailSection>
                        </DescriptionSection>
                    </BarSection>
                    <div style={{height:"20px"}}></div>
                </BarContainer>
            </BoneSection>
            <ChartSection>

            </ChartSection>
        </BonefolioContainer>
    )
}