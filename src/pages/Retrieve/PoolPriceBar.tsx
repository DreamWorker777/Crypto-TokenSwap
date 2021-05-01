import { Currency, Percent, Price } from '@shibaswap/sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'
import Row, { RowBetween, RowFlat } from '../../components/Row'

export function PoolPriceBar({
    currencies,
    noLiquidity,
    poolTokenPercentage,
    price
}: {
    currencies: { [field in Field]?: Currency }
    noLiquidity?: boolean
    poolTokenPercentage?: Percent
    price?: Price
}) {
    const { chainId } = useActiveWeb3React()
    const theme = useContext(ThemeContext)
    return (
        <div style={{ borderRadius: '1rem', backgroundColor: '#171a23', padding: '1rem', margin: '0.5rem' }}>
            <div>
                <span>Pool share</span>
            </div>
            <AutoColumn gap="md">
                <AutoRow justify="space-around" gap="4px">
                    <AutoColumn justify="center">
                        <TYPE.black>
                            {noLiquidity && price
                                ? '100'
                                : (poolTokenPercentage?.lessThan(ONE_BIPS)
                                      ? '<0.01'
                                      : poolTokenPercentage?.toFixed(2)) ?? '0'}
                            %
                        </TYPE.black>
                        <p className="metric-regular" style={{ fontWeight: 500 }}>
                            SHARE of Pool
                        </p>
                    </AutoColumn>
                </AutoRow>
            </AutoColumn>
        </div>
    )
}
