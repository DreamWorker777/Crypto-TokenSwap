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
            <div className="container my-auto pb-20">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="DIG"
                            url="/add/ETH"
                            subTitle="There are tons on BONES under the ground"
                            desc="Provide liqiudity to earn BONES."
                            buttonText="Farm BONES"
                            disabled={false}
                            icon="/images/dig_icon.svg"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="BURY"
                            url="/bury"
                            subTitle="Shibas love to bury what they have found"
                            desc="Stake tokens to get rewards."
                            buttonText="Stake Tokens"
                            disabled={false}
                            icon="/images/bury_icon.svg"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="FETCH"
                            url="/#"
                            subTitle="Swap your tokens"
                            desc="Swap tokens for other tokens."
                            buttonText="Locked"
                            disabled={true}
                            icon="/images/fetch_icon.svg"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="TREAT"
                            url="/#"
                            subTitle="Burn bones to get Treat"
                            desc="New token woofing soon!"
                            buttonText="Locked"
                            disabled={true}
                            icon="/images/treat_icon.svg"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="BONEFOLIO"
                            url="/#"
                            subTitle="Every Shiba Inu needs to check their stash."
                            desc="Check your dogalytics, bonefolio and set alerts"
                            buttonText="Locked"
                            disabled={true}
                            icon="/images/bonefolio_icon.svg"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Card
                            name="NFTs"
                            url="/#"
                            subTitle="Non Fungible Treats!"
                            desc="Woofing soon!"
                            buttonText="Locked"
                            disabled={true}
                            icon="/images/nfts_icon.svg"
                        />
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
