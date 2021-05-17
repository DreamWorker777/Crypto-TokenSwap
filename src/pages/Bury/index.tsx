import React from 'react'
import { AutoColumn } from '../../components/Column'
import { VCard } from './VCard'
import styled from 'styled-components'
import { CardHeading, Col, CardsubTitle } from '../Home/Card'
import {ChainId, SHIBASWAP_SHIB_TOKEN_ADDRESS, SHIBASWAP_BONE_TOKEN_ADDRESS, SHIBASWAP_LEASH_TOKEN_ADDRESS, SHIBASWAP_BURY_BONE_ADDRESS, SHIBASWAP_BURY_SHIB_ADDRESS, SHIBASWAP_BURY_LEASH_ADDRESS} from '@shibaswap/sdk'
import { useActiveWeb3React } from '../../hooks'

const PageWrapper = styled(AutoColumn)`
    max-width: 100%;
    width: 100%;
    justify-items: flex-start;
    height: 100%;
    
`
const ImageDiv = styled.div`
  box-shadow: inset 0 0 9px rgba(13, 13, 13, 0.43);
  border-radius: 10px;
  background-color: #1b1d2a;
  padding: 0.5rem;
`

const InnerDiv = styled.div`
    // box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.43);
    border-radius: 10px;
    // background-image: linear-gradient(
    //     to bottom,
    //     rgba(0, 0, 0, 0.25) 0%,
    //     rgba(17, 20, 27, 0.33) 31%,
    //     rgba(17, 20, 27, 0.5) 100%
    // );

    
`
const Row = styled.div`
    display: flex;
    margin: 0;
    width: 100%;
    justify-content: space-between;
    padding: 0 0 1rem 0;
`

export default function Bury(props:any) {
    
    const { chainId } = useActiveWeb3React()
    return (
        <PageWrapper gap="lg" justify="center">
            <div
                className="container pb-5 m-auto bury-container"
                style={{ padding: '1rem' }}
            >
                <InnerDiv>
                    <Row>
                        <Col>
                            <CardHeading>BURY</CardHeading>
                            <CardsubTitle style={{ paddingTop: " 0.5rem"}}>Shibas love to bury what they have found!</CardsubTitle>
                        </Col>
                        <Col>
                            <ImageDiv>
                                <img height={40} width={40} src="/images/home/bury_icon.svg" />
                            </ImageDiv>
                        </Col>
                    </Row>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                {...props}
                                url="/stake/shib"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Stake Shib"
                                tokenAddress={(SHIBASWAP_SHIB_TOKEN_ADDRESS && chainId)? SHIBASWAP_SHIB_TOKEN_ADDRESS[chainId] : ""}
                                buryTokenAddress={(SHIBASWAP_BURY_SHIB_ADDRESS && chainId) ? SHIBASWAP_BURY_SHIB_ADDRESS[chainId] :""}
                                tokenType="Shib"
                                disabled={false}
                                icon="/images/dig_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                {...props}
                                url="/stake/leash"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Stake Leash"
                                tokenAddress={(SHIBASWAP_LEASH_TOKEN_ADDRESS && chainId)? SHIBASWAP_LEASH_TOKEN_ADDRESS[chainId] : ""}
                                buryTokenAddress={(SHIBASWAP_BURY_LEASH_ADDRESS && chainId) ? SHIBASWAP_BURY_LEASH_ADDRESS[chainId] :""}
                                tokenType="Leash"
                                disabled={false}
                                icon="/images/bury_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                {...props}
                                url="/stake/bone"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Stake Bone"
                                tokenAddress={(SHIBASWAP_BONE_TOKEN_ADDRESS && chainId)? SHIBASWAP_BONE_TOKEN_ADDRESS[chainId] : ""}
                                buryTokenAddress={(SHIBASWAP_BURY_BONE_ADDRESS && chainId) ? SHIBASWAP_BURY_BONE_ADDRESS[chainId] :""}
                                tokenType="Bone"
                                disabled={false}
                                icon="/images/fetch_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                {...props}
                                url="/stake"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Coming Soon"
                                tokenAddress={""}
                                buryTokenAddress={""}
                                tokenType=""
                                disabled={true}
                                icon="/images/question-mark.png"
                            />
                        </div>
                    </div>
                </InnerDiv>
            </div>
        </PageWrapper>
    )
}
