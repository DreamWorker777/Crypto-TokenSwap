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
                            icon="/images/bury_icon.svg"
                        />
                    </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">
                        <Card
                            name="FETCH"
                            url="/fetch"
                            subTitle="Shib will retrieve your Uniswap or SushiSwap LP Tokens"
                            desc="For two weeks bring designated Liquidity Tokens from Uniswap or Sushiswap to get bonus Bone tokens."
                            buttonText="Fetch"
                            disabled={false}
                            icon="/images/fetchicon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="BURY"
                            url="/bury"
                            subTitle="Shibas love to bury what they have found"
                            desc="Stake tokens to get rewards."
                            buttonText="Stake Tokens"
                            disabled={false}
                            icon="/images/treat_icon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="SWAP"
                            url="/swap"
                            subTitle="Tell your Shiba Inu to fetch new tokens"
                            desc="Swap tokens for other tokens."
                            buttonText="Swap"
                            disabled={false}
                            icon="/images/fetch_icon.svg"
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
                            buttonText="Bonefolio"
                            disabled={false}
                            icon="/images/bonefolio_icon.svg"
                        />
                    </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                    <div className="card_styles">

                        <Card
                            name="Yield"
                            url="/yield"
                            subTitle="Farm Bone"
                            desc="Stake SSLP Tokens to earn BONE rewards!"
                            buttonText="Farm"
                            disabled={false}
                            icon="/images/nfts_icon.svg"
                        />
                    </div>
                    </div>

                </div>                
            </div>
        </PageWrapper>
    )
}
