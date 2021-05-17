import React from 'react'
import { AutoColumn } from '../../components/Column'
import { Card } from './Card'
import styled from 'styled-components'

const PageWrapper = styled(AutoColumn)`
    max-width: 100%;
    width: 100%;
    justify-items: flex-start;
    height: 100%;
`

const Col = styled.div<{ size: any }>`
    justify-content: flex-start;
    flex: ${props => props.size};
`

export default function Home() {
    return (
        <PageWrapper gap="lg" justify="center">
            <div className="container my-auto pb-10 home-container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card_styles">
                        <Card
                            name="DIG"
                            url="/pool"
                            subTitle="There are tons on BONES under the ground"
                            desc="Provide liqiudity to earn BONES."
                            buttonText="Farm BONES"
                            disabled={false}
                            icon="/images/home/dig_icon.svg"
                        />
                    </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">
                        <Card
                            name="FETCH"
                            url="/fetch"
                            subTitle="Retrieve UNI-V2-LP or SLP for our event"
                            desc="For two weeks bring designated Liquidity Tokens from Uniswap or Sushiswap to get bonus Bone tokens."
                            buttonText="Fetch"
                            disabled={false}
                            icon="/images/home/fetchicon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="BURY"
                            url="/bury"
                            subTitle="Shibas love to bury what they have found"
                            desc="Stake tokens to gain returns."
                            buttonText="Stake Tokens"
                            disabled={false}
                            icon="/images/home/bury_icon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="SWAP"
                            url="/swap"
                            subTitle="Tell your Shiba Inu to fetch new tokens"
                            desc="Swap your tokens for other tokens."
                            buttonText="Swap"
                            disabled={false}
                            icon="/images/home/swap_icon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="BONEFOLIO"
                            url="/bonefolio"
                            subTitle="Every Shiba Inu needs to check their stash"
                            desc="Check your dogalytics, Bonefolio and set alerts."
                            buttonText="Check your portfolio"
                            disabled={false}
                            icon="/images/home/bonefolio_icon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="YIELD"
                            url="/yield"
                            subTitle="Claim your returns"
                            desc="Stake SSLP Tokens to earn BONE rewards!"
                            buttonText="Returns"
                            disabled={false}
                            icon="/images/home/yield_icon.svg"
                        />
                    </div>
                    </div>

                </div>                
            </div>
        </PageWrapper>
    )
}
