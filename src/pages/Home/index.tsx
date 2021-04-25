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
const Grid = styled.div`
  margin: auto;
`

const Row = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
`;

const Col = styled(AutoColumn)`
  justify-content: flex-start;
`;


const cd1 = <Col><Card name='DIG' url='/pool' subTitle='There are tons on BONES under the ground' desc='Provide liqiudity to earn BONES' buttonText='Farm BONES' disabled={false} /></Col>
const cd2 = <Col><Card name='BURY' url='/pool' subTitle='Shibas love to bury what they have found' desc='Stake tokens to get rewards' buttonText='Stake Tokens' disabled={false} /></Col>
const cd3 = <Col><Card name='FETCH' url='/pool' subTitle='Swap your tokens' desc='Swap tokens for other tokens' buttonText='Locked' disabled={true} /></Col>
const cd4 = <Col><Card name='TREAT' url='/pool' subTitle='Burn bones to get Treat' desc='New token woofing soon' buttonText='Locked' disabled={true} /></Col>
const cd5 = <Col><Card name='BONEFOLIO' url='/pool' subTitle='Every Shiba Inu needs to check their stash' desc='Check your dogalytics, bonefolio and set alerts' buttonText='Locked' disabled={true} /></Col>
const cd6 = <Col><Card name='NFTs' url='/pool' subTitle='Non Fungible Treats!' desc='Woofing soon' buttonText='Locked' disabled={true} /></Col>

export default function Earn() {
  return (
    <PageWrapper gap="lg" justify="center">
     <Grid>
     <Row>
        {cd1}
        {cd2}
        {cd3}
      </Row>
      <Row>
        {cd4}
        {cd5}
        {cd6}
      </Row>
     </Grid>
    </PageWrapper>
  );
}