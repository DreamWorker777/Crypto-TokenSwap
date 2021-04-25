import React, { FunctionComponent } from 'react' // importing FunctionComponent
import styled from 'styled-components'
import { ExternalLink } from '../../../src/components/Link';

const CardWrapper = styled.div`
    width: 22rem;
    height: 14rem;
    box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.45);
    border-radius: 1rem;
    margin: 1.1rem 1.5rem;
    :hover {
      box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.45);
      background-color: #313543;
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
    font-size: 1.5rem;
    text-align: left;
    font-weight: 700;
    color: white;
    margin: 0;
`

const CardsubTitle = styled.p`
    font-size: 1rem;
    text-align: left;
    font-weight: 400;
    color: white;
    margin: 0;
    padding-top: 0.2rem;
`

const CardDesc = styled.p`
    font-size: 1rem;
    text-align: left;
    font-weight: 400;
    color: white;
    margin: 0;
    margin-top: 1.4rem;
    margin-bottom: 3rem;
`
const Button = styled.a`
    background-color: #383648;    
    color: #fea31c;
    font-size: 0.8rem;
    margin: 2rem 0;
    padding: 0.25em 1em;
    border-radius: 1rem;
    bottom: 2rem;
    font-weight: 900;
    padding: 0.5rem 2.5rem;
`

type CardProps = {
    name: string
    url: string
    subTitle: string
    desc: string
    buttonText: string
    disabled: boolean
}

export const Card: FunctionComponent<CardProps> = ({ name, url, subTitle, desc, buttonText, disabled }) => (
    <aside>
        <CardWrapper>
            <CardHeader>
                <CardHeading>{name}</CardHeading>
                <CardsubTitle>{subTitle}</CardsubTitle>
                <CardDesc>{desc}</CardDesc>
                <Button href={url}>{buttonText}</Button>
            </CardHeader>
        </CardWrapper>
    </aside>
)
