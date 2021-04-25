import React, { FunctionComponent } from 'react' // importing FunctionComponent
import styled from 'styled-components'

const CardWrapper = styled.div`
    width: 100%;
    height: 23rem;
    box-shadow: inset 0 0 9px rgba(13, 13, 13, 0.43);
    border-radius: 0.7rem;
    background-color: #1b1d2a;
    position: relative;
`
const CardHeader = styled.header`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
`
const CardHeading = styled.h1`
    font-size: 2.3rem;
    text-align: left;
    font-weight: 700;
    color: #d5d5d5;
    margin: 0;
    font-family: Metric;
    line-height: 1.5rem;
    padding-top: 0.4rem;
`

const CardsubTitle = styled.p`
    font-size: 0.9rem;
    text-align: left;
    font-weight: 500;
    color: #d5d5d5;
    margin: 0;
    font-family: Metric;
`

const CardDesc = styled.p`
    font-size: 0.9rem;
    text-align: left;
    font-weight: 500;
    color: #d5d5d5;
    margin: 0;
    margin-top: 1.4rem;
    margin-bottom: 5rem;
    font-family: Metric;
`
// const Button = styled.a<{ disabled: boolean }>`
//     color: #292c37;
//     width: 4rem;
//     font-size: 1rem;
//     font-weight: 600;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     letter-spacing: 0.12px;
//     text-align: center;
//     padding: 0.5rem 1rem;
//     border-radius: 0.6rem;
//     border: 1px solid #000000;
//     background-color: #d5d5d5;
//     :hover {
//       color: #292c37;
//     }
//     ${props =>
//         props.disabled &&
//         `
//       pointer-events: none;
//       color: #939395;
//   `}
// `
const Row = styled.div`
    display: flex;
    margin: 0;
    width: 100%;
    justify-content: space-between;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageDiv = styled.div`
    box-shadow: inset 0 0 9px rgba(13, 13, 13, 0.8);
    border-radius: 10px;
    padding: 0.5rem;
    background: transparent;
`

const Image = styled.img`
    height: 10rem;
    padding: 1rem;
    margin: auto;
`

type CardProps = {
    name: string
    url: string
    percentage: string
    value: string
    buttonText: string
    disabled: boolean
    icon: string
}

const InnerDiv = styled.div`
    border-radius: 0.6rem;
    background-color: #292c37;
    padding: 1rem;
    height: 11.5rem;
`
const P1 = styled.p`
    text-align: center;
    font-size: 0.9rem;
`

const P2 = styled.p`
    text-align: center;
    font-size: 0.9rem;
    padding-bottom: 0.5rem;
`

const P3 = styled.p`
    text-align: center;
    font-size: 0.9rem;
    padding-top: 1rem;
`

const P4 = styled.p`
    text-align: center;
    font-size: 0.9rem;
    padding-bottom: 1rem;
`
const Button = styled.a<{ disabled: boolean }>`
    font-size: 1rem;
    background-color: #d5d5d5;
    color: #292c37;
    border-radius: 0.6rem;
    font-weight: bold;
    padding: 0.5rem 1.3rem;
    margin: auto;
    text-align: center;
    :hover {
      color: #292c37;
    }
    ${props =>
        props.disabled &&`
      pointer-events: none;
      color: #939395;
  `}
`

export const VCard: FunctionComponent<CardProps> = ({ name, percentage, value, buttonText, disabled, icon, url }) => (
    <CardWrapper>
        <CardHeader>
            <Image src={icon} />
            <InnerDiv>
                <P1>{name}</P1>
                <P2>{percentage}</P2>
                <P3>Total staked</P3>
                <P4>{value}</P4>
                <div style={{ textAlign: 'center' }}>
                  <Button href={url} disabled={disabled}>
                    {buttonText}
                  </Button>
                </div>
            </InnerDiv>
        </CardHeader>
    </CardWrapper>
)
