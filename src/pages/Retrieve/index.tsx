import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useCurrency } from '../../hooks/Tokens'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { Field } from '../../state/mint/actions'
import { Currency, currencyEquals, ETHER, TokenAmount, WETH } from '@shibaswap/sdk'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import React, { useCallback, useContext, useState } from 'react'
import { currencyId } from '../../utils/currencyId'
import { PoolPriceBar } from './PoolPriceBar'
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/ButtonLegacy'
import { Text } from 'rebass'

export default function Retrieve({
    match: {
        params: { currencyIdA, currencyIdB }
    },
    history
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
    const { independentField, typedValue, otherTypedValue } = useMintState()
    const currencyA = useCurrency(currencyIdA)
    const currencyB = useCurrency(currencyIdB)
    const {
        dependentField,
        currencies,
        pair,
        pairState,
        currencyBalances,
        parsedAmounts,
        price,
        noLiquidity,
        liquidityMinted,
        poolTokenPercentage,
        error
    } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const isValid = !error

    const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
    }

    const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
        (accumulator, field) => {
            return {
                ...accumulator,
                [field]: maxAmountSpend(currencyBalances[field])
            }
        },
        {}
    )

    const handleCurrencyASelect = useCallback(
        (currencyA: Currency) => {
            const newCurrencyIdA = currencyId(currencyA)
            history.push(`/retrieve/${newCurrencyIdA}`)
        },
        [history, currencyIdA]
    )

    const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
        (accumulator, field) => {
            return {
                ...accumulator,
                [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0')
            }
        },
        {}
    )

    return (
        <div className="container">
            <div className="row">
                <div
                    className="offset-md-3 col-md-6"
                    style={{
                        boxShadow: '0 0 9px 4px rgba(0, 0, 0, 0.43)',
                        borderRadius: '0.7rem',
                        padding: '1rem',
                        backgroundImage:
                            'linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(17, 20, 27, 0.33) 31%, rgba(17, 20, 27, 0.5) 100%)'
                    }}
                >
                    <div className="row justify-content-between align-item-center">
                        <div className="col-8 p-0">
                            <h1
                                className="align-self-center metric-bold"
                                style={{
                                    color: '#d5d5d5',
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    fontStyle: 'normal',
                                    letterSpacing: 'normal',
                                    lineHeight: '3rem',
                                    textAlign: 'left',
                                    textTransform: 'uppercase'
                                }}
                            >
                                FETCH
                            </h1>
                            <p
                                style={{
                                    color: '#d5d5d5',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    fontStyle: 'normal',
                                    letterSpacing: 'normal',
                                    lineHeight: 'normal',
                                    textAlign: 'left'
                                }}
                            >
                                Shib will retrieve your Uniswap or Sushiswap Tokens
                            </p>
                        </div>
                        <div className=" offet-md-2 col-2 px-2 py-0">
                            <img src="/images/retrieve.png" />
                        </div>
                        <div className="col-12 px-0">
                            <p
                                style={{
                                    color: '#d5d5d5',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    fontStyle: 'normal',
                                    letterSpacing: 'normal',
                                    lineHeight: 'normal',
                                    textAlign: 'left'
                                }}
                            >
                                Description about the days of the Liquidity Event blablabla blablabla
                            </p>
                        </div>
                        <div className="col-12 pl-0">
                            <a
                                href="#"
                                style={{
                                    color: '#b2b3b6',
                                    textDecoration: 'underline',
                                    fontStyle: 'italic',
                                    fontSize: '1rem'
                                }}
                            >
                                Read more about Uniswap or Sushiswap Tokens
                            </a>
                        </div>
                        <div
                            className="col-12"
                            style={{
                                boxShadow: '0 0 2px 3px rgba(0, 0, 0, 0.25)',
                                borderRadius: '0.7rem',
                                border: '1px solid #30333e',
                                backgroundColor: '#30333e',
                                opacity: '0.7',
                                margin: 'auto',
                                marginTop: '1rem'
                            }}
                        >
                            <CurrencyInputPanel
                                value={formattedAmounts[Field.CURRENCY_A]}
                                onUserInput={onFieldAInput}
                                onMax={() => {
                                    onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                                }}
                                onCurrencySelect={handleCurrencyASelect}
                                showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                                currency={currencies[Field.CURRENCY_A]}
                                currenciesAB={currencies}
                                type={Field.CURRENCY_A}
                                id="add-liquidity-input-tokena"
                                showCommonBases
                            />
                            <hr style={{ color: '#3F424B' }} />
                            {currencies[Field.CURRENCY_A] && (
                                <>
                                    <div className="poolPriceBar">
                                        <PoolPriceBar
                                            currencies={currencies}
                                            poolTokenPercentage={poolTokenPercentage}
                                            noLiquidity={noLiquidity}
                                            price={price}
                                        />
                                    </div>
                                </>
                            )}

                            <ButtonError
                                onClick={() => {
                                    setShowConfirm(true)
                                }}
                                disabled={!isValid}
                            >
                                <Text fontSize={25} fontWeight={500}>
                                    Supply
                                </Text>
                            </ButtonError>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
