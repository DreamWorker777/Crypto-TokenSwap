import { AddressZero } from '@ethersproject/constants'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { JSBI } from '@shibaswap/sdk'
import { useShibaSwapUniV2FetchContract, useSushiRollContract } from 'hooks/useContract'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ChevronRight } from 'react-feather'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import Circle from '../../assets/images/blue-loader.svg'
import { ButtonConfirmed } from '../../components/ButtonLegacy'
import { LightCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { FixedHeightRow } from '../../components/PositionCard'
import QuestionHelper from '../../components/QuestionHelper'
import { AutoRow, RowFixed } from '../../components/Row'
import { Dots } from '../../components/swap/styleds'
import { useActiveWeb3React } from '../../hooks'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useMigrateState, { MigrateState } from '../../hooks/useMigrateState'
import { BackArrow, CloseIcon, CustomLightSpinner, TYPE } from '../../theme'
import LPToken from '../../types/LPToken'
import MetamaskError from '../../types/MetamaskError'
import AppBody from '../AppBody'
import { EmptyState } from '../MigrateV1/EmptyState'
import { MaxButton } from '../Pool/styleds'
import { Helmet } from 'react-helmet'
import { FACTORY_ADDRESS as SUSHI_FACTORY_ADDRESS } from '@sushiswap/sdk'
import { FACTORY_ADDRESS as UNI_FACTORY_ADDRESS } from '@uniswap/sdk'

const Border = styled.div`
    width: 100%;
    height: 1px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: ${({ theme }) => theme.bg2};
`

const ZERO = JSBI.BigInt(0)

const AmountInput = ({ state }: { state: MigrateState }) => {
    const onPressMax = useCallback(() => {
        if (state.selectedLPToken) {
            let balance = state.selectedLPToken.balance.raw
            if (state.selectedLPToken.address === AddressZero) {
                // Subtract 0.01 ETH for gas fee
                const fee = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16))
                balance = JSBI.greaterThan(balance, fee) ? JSBI.subtract(balance, fee) : ZERO
            }

            state.setAmount(formatUnits(balance.toString(), state.selectedLPToken.decimals))
        }
    }, [state])

    useEffect(() => {
        if (!state.mode || state.lpTokens.length === 0 || !state.selectedLPToken) {
            state.setAmount('')
        }
    }, [state])

    if (!state.mode || state.lpTokens.length === 0 || !state.selectedLPToken) {
        return <span />
    }

    return (
        <>
            <TYPE.mediumHeader style={{ justifySelf: 'flex-start' }}>Amount of Tokens</TYPE.mediumHeader>
            <LightCard>
                <FixedHeightRow>
                    <NumericalInput value={state.amount} onUserInput={val => state.setAmount(val)} />
                    <MaxButton onClick={onPressMax} width="10px">
                        MAX
                    </MaxButton>
                </FixedHeightRow>
            </LightCard>
            <Border />
        </>
    )
}

interface PositionCardProps {
    lpToken: LPToken
    onClick: (lpToken: LPToken) => void
    onDismiss: () => void
    isSelected: boolean
    updating: boolean
    isSushi?: boolean
}

const LPTokenSelect = ({ lpToken, onClick, onDismiss, isSelected, updating, isSushi }: PositionCardProps) => {
    const theme = useContext(ThemeContext)

    return (
        <LightCard>
            <AutoColumn gap="12px">
                <FixedHeightRow>
                    <RowFixed onClick={() => onClick(lpToken)}>
                        <DoubleCurrencyLogo
                            currency0={lpToken.tokenA}
                            currency1={lpToken.tokenB}
                            margin={true}
                            size={20}
                        />
                        <TYPE.body fontWeight={500} style={{ marginLeft: '' }}>
                            {`${lpToken.tokenA.symbol}/${lpToken.tokenB.symbol}`}
                        </TYPE.body>
                       {!isSushi? <Text
                            fontSize={12}
                            fontWeight={500}
                            ml="0.5rem"
                            px="0.75rem"
                            py="0.25rem"
                            style={{ borderRadius: '1rem' }}
                            backgroundColor={theme.yellow1}
                            color={'black'}
                        >
                          V2
                        </Text>: <div></div>}
                    </RowFixed>
                    {updating ? (
                        <CustomLightSpinner src={Circle} alt="loader" size="20px" />
                    ) : isSelected ? (
                        <CloseIcon onClick={onDismiss} />
                    ) : (
                        <ChevronRight onClick={() => onClick(lpToken)} />
                    )}
                </FixedHeightRow>
            </AutoColumn>
        </LightCard>
    )
}

const MigrateModeSelect = ({ state }: { state: MigrateState }) => {
    const unsetMode = () => state.setMode(undefined)

    const items = [
        {
            key: 'permit',
            text: 'Non-hardware Wallet',
            description: 'Migration is done in one-click using your signature(permit)'
        },
        {
            key: 'approve',
            text: 'Hardware Wallet',
            description: 'You need to first approve LP tokens and then migrate it'
        }
    ]

    return (
        <>
            <TYPE.mediumHeader style={{ justifySelf: 'flex-start' }}>Wallet Type</TYPE.mediumHeader>
            {items.reduce((acc: any, { key, text, description }: any) => {
                if (state.mode === undefined || key === state.mode)
                    acc.push(
                        <LightCard key={key}>
                            <AutoColumn gap="12px">
                                <RowFixed>
                                    <AutoRow onClick={() => state.setMode(key)}>
                                        <AutoRow marginBottom="2px">
                                            <TYPE.body fontWeight={500}>{text}</TYPE.body>
                                        </AutoRow>
                                        <AutoRow>
                                            <TYPE.darkGray fontSize=".75rem">{description}</TYPE.darkGray>
                                        </AutoRow>
                                    </AutoRow>
                                    {key === state.mode ? (
                                        <CloseIcon onClick={unsetMode} />
                                    ) : (
                                        <ChevronRight onClick={unsetMode} />
                                    )}
                                </RowFixed>
                            </AutoColumn>
                        </LightCard>
                    )
                return acc
            }, [])}
            <Border />
        </>
    )
}

const MigrateButtons = ({ state, isSushi }: { state: MigrateState, isSushi: boolean }) => {
    const [error, setError] = useState<MetamaskError>({})
    const sushiRollContract = useSushiRollContract()
    const shibaSwapUniV2FetchContract = useShibaSwapUniV2FetchContract()
    const [approval, approve] = useApproveCallback(state.selectedLPToken?.balance, shibaSwapUniV2FetchContract?.address)
    const noLiquidityTokens = !!state.selectedLPToken?.balance && state.selectedLPToken?.balance.equalTo(ZERO)
    const isButtonDisabled = !state.amount

    useEffect(() => {
        setError({})
    }, [state.selectedLPToken])

    if (!state.mode || state.lpTokens.length === 0 || !state.selectedLPToken) {
        return <span />
    }

    const insufficientAmount = JSBI.lessThan(
        state.selectedLPToken.balance.raw,
        JSBI.BigInt(parseUnits(state.amount || '0', state.selectedLPToken.decimals).toString())
    )

    const onPress = async () => {
        setError({})
        try {
            await state.onMigrate()
        } catch (e) {
            setError(e)
        }
    }

    return (
        <AutoColumn gap="20px">
            <LightCard>
                <AutoRow style={{ flex: '1', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <TYPE.body fontSize=".875rem" fontWeight={500}>
                        {state.selectedLPToken.symbol}
                    </TYPE.body>
                    <TYPE.body fontSize=".875rem" fontWeight={500}>
                        {state.amount}
                    </TYPE.body>
                </AutoRow>
                {insufficientAmount ? (
                    <AutoColumn gap="12px" style={{ flex: '1' }}>
                        <TYPE.darkGray fontSize=".875rem" style={{ textAlign: 'center' }}>
                            Insufficient Balance
                        </TYPE.darkGray>
                    </AutoColumn>
                ) : state.loading ? (
                    <Dots>Loading</Dots>
                ) : (
                    <AutoRow>
                        {state.mode === 'approve' && (
                            <AutoColumn gap="12px" style={{ flex: '1', marginRight: 12 }}>
                                <ButtonConfirmed
                                    onClick={approve}
                                    confirmed={approval === ApprovalState.APPROVED}
                                    disabled={approval !== ApprovalState.NOT_APPROVED || isButtonDisabled}
                                    altDisabledStyle={approval === ApprovalState.PENDING}
                                >
                                    {approval === ApprovalState.PENDING ? (
                                        <Dots>Approving</Dots>
                                    ) : approval === ApprovalState.APPROVED ? (
                                        'Approved'
                                    ) : (
                                        'Approve'
                                    )}
                                </ButtonConfirmed>
                            </AutoColumn>
                        )}
                        <AutoColumn gap="12px" style={{ flex: '1' }}>
                            <ButtonConfirmed
                                disabled={
                                    noLiquidityTokens ||
                                    state.isMigrationPending ||
                                    (state.mode === 'approve' && approval !== ApprovalState.APPROVED) ||
                                    isButtonDisabled
                                }
                                onClick={onPress}
                            >
                                {state.isMigrationPending ? <Dots>Migrating</Dots> : 'Migrate'}
                            </ButtonConfirmed>
                        </AutoColumn>
                    </AutoRow>
                )}
                {error.message && error.code !== 4001 && (
                    <TYPE.body color="red" fontWeight={500} fontSize="0.875rem" marginTop="1.5rem" textAlign="center">
                        {error.message}
                    </TYPE.body>
                )}
            </LightCard>
            <TYPE.darkGray fontSize="0.75rem" textAlign="center">
                {`Your ${isSushi?"Sushiswap":"Uniswap"} ${state.selectedLPToken.tokenA.symbol}/${state.selectedLPToken.tokenB.symbol} liquidity will become Shibaswap ${state.selectedLPToken.tokenA.symbol}/${state.selectedLPToken.tokenB.symbol} liquidity.`}
            </TYPE.darkGray>
        </AutoColumn>
    )
}

const UniswapLiquidityPairs = ({ state, title, isSushi }: { state: MigrateState; title: string, isSushi: boolean }) => {
    let content: JSX.Element
    const onClick = useCallback(
        lpToken => {
            state.setAmount('')
            state.setSelectedLPToken(lpToken)
        },
        [state]
    )

    const onDismiss = useCallback(() => {
        state.setAmount('')
        state.setSelectedLPToken(undefined)
    }, [state])

    if (!state.mode) {
        content = <span />
    } else if (state.lpTokens.length === 0) {
        content = <EmptyState message="No V2 Liquidity found." />
    } else {
        content = (
            <>
                {state.lpTokens.reduce<JSX.Element[]>((acc, lpToken) => {
                    if (lpToken.balance && JSBI.greaterThan(lpToken.balance.raw, JSBI.BigInt(0))) {
                        acc.push(
                            <LPTokenSelect
                                lpToken={lpToken}
                                key={lpToken.address}
                                onClick={onClick}
                                onDismiss={onDismiss}
                                isSelected={state.selectedLPToken === lpToken}
                                updating={state.updatingLPTokens}
                                isSushi={isSushi}
                            />
                        )
                    }
                    return acc
                }, [])}
            </>
        )
    }

    return (
        <>
            <TYPE.mediumHeader style={{ justifySelf: 'flex-start' }}>{title}</TYPE.mediumHeader>
            {content}
            <Border />
        </>
    )
}

const MigrateV2 = () => {
    const theme = useContext(ThemeContext)
    const { account, chainId } = useActiveWeb3React()
    const state = useMigrateState('unifetch', UNI_FACTORY_ADDRESS)

    const MigrateUniBlock = styled.div`
        display: 'inline-block';
        width: '45%';
        margintop: '30px';
        @media (max-width: 1000px) {
            width: auto;
            height: auto;
            margin: 0;
            margintop: '50px';
        }
        @media(max-width: 500px){
            width: 100%;
        }
    `
    return (
        <>
            <MigrateUniBlock style={{ marginRight: '20px' }}>
                <Helmet>
                    <title>Migrate | Sushi</title>
                    <meta name="description" content="Migrate Uniswap LP tokens to Shiba LP tokens" />
                </Helmet>
                <AppBody style={{ padding: 24 }}>
                    <AutoColumn gap="16px">
                        <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
                            {/* <BackArrow to="/pool" /> */}
                            <TYPE.mediumHeader>Migrate Uniswap Liquidity</TYPE.mediumHeader>
                            <div>
                                <QuestionHelper text="Migrate your Uniswap LP tokens to ShibaSwap LP tokens." />
                            </div>
                        </AutoRow>
                        <TYPE.darkGray style={{ marginBottom: 8, fontWeight: 400 }}>
                            For each pool shown below, click migrate to remove your liquidity from Uniswap and deposit
                            it into Shibaswap.
                        </TYPE.darkGray>

                        {!account ? (
                            <LightCard padding="40px">
                                <TYPE.body color={theme.text3} textAlign="center">
                                    Connect to a wallet to view your V2 liquidity.
                                </TYPE.body>
                            </LightCard>
                        ) : state.loading ? (
                            <LightCard padding="40px">
                                <TYPE.body color={theme.text3} textAlign="center">
                                    <Dots>Loading</Dots>
                                </TYPE.body>
                            </LightCard>
                        ) : (
                            <>
                                <MigrateModeSelect state={state} />
                                <UniswapLiquidityPairs state={state} title={'Your Uniswap Liquidity'} isSushi={false} />
                                <AmountInput state={state} />
                                <MigrateButtons state={state} isSushi={false}/>
                            </>
                        )}
                    </AutoColumn>
                </AppBody>
                <br></br>
                
            </MigrateUniBlock>
        </>
    )
}

const MigrateV2Sushi = () => {
    const theme = useContext(ThemeContext)
    const { account, chainId } = useActiveWeb3React()
    const state = useMigrateState('sushifetch', SUSHI_FACTORY_ADDRESS[chainId ? chainId : 1])

    const MigrateSushiBlock = styled.div`
        display: 'inline-block';
        width: '45%';
        marginleft: '10px';

        @media (max-width: 1000px) {
            width: auto;
            height: auto;
            margin: 0;
        }
        @media(max-width: 500px){
            width: 100%;
        }
    `

    return (
        <>
            <MigrateSushiBlock>
                <Helmet>
                    <title>Migrate | Sushi</title>
                    <meta name="description" content="Migrate Sushiswap LP tokens to Shiba LP tokens" />
                </Helmet>
                <AppBody style={{ padding: 24 }}>
                    <AutoColumn gap="16px">
                        <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
                            
                            <TYPE.mediumHeader>Migrate Sushiswap Liquidity</TYPE.mediumHeader>
                            <div>
                                <QuestionHelper text="Migrate your Sushiswap LP tokens to ShibaSwap LP tokens." />
                            </div>
                        </AutoRow>
                        <TYPE.darkGray style={{ marginBottom: 8, fontWeight: 400 }}>
                            For each pool shown below, click migrate to remove your liquidity from Sushiswap and deposit
                            it into Shibaswap.
                        </TYPE.darkGray>

                        {!account ? (
                            <LightCard padding="40px">
                                <TYPE.body color={theme.text3} textAlign="center">
                                    Connect to a wallet to view your V2 liquidity.
                                </TYPE.body>
                            </LightCard>
                        ) : state.loading ? (
                            <LightCard padding="40px">
                                <TYPE.body color={theme.text3} textAlign="center">
                                    <Dots>Loading</Dots>
                                </TYPE.body>
                            </LightCard>
                        ) : (
                            <>
                                <MigrateModeSelect state={state} />
                                <UniswapLiquidityPairs state={state} title="Your Sushiswap Liquidity" isSushi={true} />
                                <AmountInput state={state} />
                                <MigrateButtons state={state} isSushi={true}/>
                            </>
                        )}
                    </AutoColumn>
                </AppBody>
            </MigrateSushiBlock>
        </>
    )
}

const MigrateParent = () => {
    const MigrateSection = styled.div`
        display: block;
        width: auto;
        //border: 2px solid white;
        padding-top: 50px;
        padding-left: 30px;
        font-family: Metric - Regular;
        font-style: Metric - Regular;
        padding-right: 30px;
        text-align: center;
        box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.43);
        border-radius: 10px;
        background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(17, 20, 27, 0.33) 31%,
            rgba(17, 20, 27, 0.5) 100%
        );

        @media (max-width: 1000px) {
            height: auto;
        }
        @media(max-width: 500px){
            width: 100%;
        }
    `

    const MigrationBlock = styled.div`
        display: inline-flex;
        width: auto;
        //border: 2px solid white;
        @media (max-width: 1000px) {
            display: block;
            text-align: left;
            height: auto;
            margin: 0;
        }
    `
    const HeaderSection = styled.div`
        display: inline-block;
        width: 100%;
        text-align: center;
        @media (max-width: 1000px) {
            text-align: center;
        }
    `

    const BackArrowSection = styled.div`
        display: inline-block;
        width: 10%;
        height: 100%;
        float:left;
    `;

    const TitleSection = styled.div`
        display: inline-block;
        width: 70%;
        float:center;
        padding-right:60px;
    `;


    return (
        <MigrateSection>
            <HeaderSection>
                <BackArrowSection>
                <BackArrow to="/" />
                </BackArrowSection>
                
                <TitleSection>
                <TYPE.white
                    fontWeight={700}
                    fontSize={"30px"}
                    fontFamily={'Metric - Bold'}
                >
                    Migrate your LP tokens
                </TYPE.white>
                </TitleSection>
            </HeaderSection>
            <div style={{ height: '20px' }}></div>
            <br></br>
            <MigrationBlock>
                <MigrateV2 />
                <MigrateV2Sushi />
            </MigrationBlock>
        </MigrateSection>
    )
}

export default MigrateParent
