import React from 'react'
import styled from 'styled-components'
import { useLastTruthy } from '../../hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
    padding-top: calc(16px + 2rem);
    padding-bottom: 16px;
    width: 100%;
    max-width: 544px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: ${({ theme }) => theme.text2};
    background-color: #202231;
    // background-color: ${({ theme }) => theme.advancedBG};
    z-index: -1;

    transform: ${({ show }) => (show ? 'translateY(-30%)' : 'translateY(-30%)')};
    transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
    const lastTrade = useLastTruthy(trade)

    return (
        <AdvancedDetailsFooter show={Boolean(trade)} className="view_analytic">
            <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
        </AdvancedDetailsFooter>
    )
}
