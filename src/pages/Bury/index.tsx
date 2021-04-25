import React from 'react'
import { AutoColumn } from '../../components/Column'
import { VCard } from './VCard'
import styled from 'styled-components'
import { CardHeading, Col, CardsubTitle } from '../Home/Card'
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

export default function Bury() {
    return (
        <PageWrapper gap="lg" justify="center">
            <div
                className="container pb-5 m-auto"
                style={{ backgroundColor: '#101218', padding: '1rem', width: '65%' }}
            >
                <InnerDiv>
                    <Row>
                        <Col>
                            <CardHeading>BURY</CardHeading>
                            <CardsubTitle>Shibas love to bury what they have found</CardsubTitle>
                        </Col>
                        <Col>
                            <ImageDiv>
                                <img height={40} width={40} src="/images/bury_icon.svg" />
                            </ImageDiv>
                        </Col>
                    </Row>
                    <div className="row" style={{paddingTop: "1rem",paddingBottom: "1rem"}}>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                url="/stake"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Shib"
                                disabled={false}
                                icon="/images/dig_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                url="/stake"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Leash"
                                disabled={false}
                                icon="/images/bury_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                url="/stake"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Bone"
                                disabled={false}
                                icon="/images/fetch_icon.svg"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <VCard
                                url="/stake"
                                name="APY"
                                percentage="0.00%"
                                value="0,00000"
                                buttonText="Soon"
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
