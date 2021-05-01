import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import Retrieve from './index'

import sushiData from '@sushiswap/sushi-data'

// note: only for mainnet
export function RedirectPairToLiquidity({ location }: RouteComponentProps) {
    const paths = location.pathname.split('/')
    // pair address in route

    if (!paths?.[1]) {
        return <Redirect to={'/retrieve/'} />
    } else {
        try {
            //await sushiData.exchange.pair({ pair_address: String(paths?.[1]).toLowerCase() })
            return <Redirect to={'/retrieve/'} />
        } catch (e) {
            return <Redirect to={'/retrieve/'} />
        }
    }
}

export function RedirectToAddLiquidity() {
    return <Redirect to="/retrieve/" />
}

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/
export function RedirectOldRetrievePathStructure(props: RouteComponentProps<{ currencyIdA: string }>) {
    const {
        match: {
            params: { currencyIdA }
        }
    } = props
    const match = currencyIdA.match(OLD_PATH_STRUCTURE)
    if (match?.length) {
        return <Redirect to={`/retrieve/${match[1]}/${match[2]}`} />
    }

    return <Retrieve {...props} />
}

export function RedirectDuplicateTokenIds(props: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
    const {
        match: {
            params: { currencyIdA, currencyIdB }
        }
    } = props
    if (currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
        return <Redirect to={`/retrieve/${currencyIdA}`} />
    }
    return <Retrieve {...props} />
}
