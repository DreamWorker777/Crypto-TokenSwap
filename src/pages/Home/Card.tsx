import React, { FunctionComponent } from 'react' // importing FunctionComponent
import styled from 'styled-components'

export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
}

const CardWrapper = styled.div`
    width: 100%;
    height: 14rem;
    background-color: #1B1E29;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    position: relative;
    :hover {
        box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.45);
        background-color: #262936;
        opacity: 0.5;
    }
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
const Button = styled.a<{ disabled: boolean }>`
    background-color: #383648;
    border-radius: 2rem;
    color: #fea31c;
    font-size: 0.8rem;
    font-weight: 600;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    padding: 0.5rem 2.75rem;
    line-height: normal;
    position: absolute;
    bottom: 0.6rem;
    ${props =>
        props.disabled &&
        `
      pointer-events: none;
      color: #939395;
  `}
`
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

const Image = styled.img``

type CardProps = {
    name: string
    url: string
    subTitle: string
    desc: string
    buttonText: string
    disabled: boolean
    icon: string
}

export const Card: FunctionComponent<CardProps> = ({ name, url, subTitle, desc, buttonText, disabled, icon }) => (
        <CardWrapper>
            <CardHeader>
                <Row>
                    <Col>
                      <CardHeading>{name}</CardHeading>
                      <CardsubTitle>{subTitle}</CardsubTitle>
                    </Col>
                    <Col>
                      <ImageDiv>
                          <Image height={40} width={40} src={icon} />
                      </ImageDiv>
                    </Col>
                </Row>
                <CardDesc>{desc}</CardDesc>
                <Button href={url} disabled={disabled}>
                  {buttonText}
                </Button>
            </CardHeader>
        </CardWrapper>
)
