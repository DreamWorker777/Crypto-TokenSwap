import { BigNumber } from '@ethersproject/bignumber'
import {MASTERCHEF_ADDRESS, SHIBASWAP_TOPDOG_ADDRESS, Token, TokenAmount} from '@shibaswap/sdk'
import { Input as NumericalInput } from 'components/NumericalInput'
import { Fraction } from '../../entities'
import { ethers } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useMasterChef from 'hooks/useMasterChef'
import usePendingSushi from 'hooks/usePendingSushi'
import useStakedBalance from 'hooks/useStakedBalance'
import useTokenBalance from 'sushi-hooks/useTokenBalance'
import { formattedNum, isAddressString, isWETH } from 'utils'
import { Dots } from '../Pool/styleds'
import { Button } from './components'
import useTopDog from "../../hooks/useTopDog";
import useShibaSwapPendingBone from "../../hooks/useShibaSwapPendingBone";
import useShibaSwapStakedBalance from "../../hooks/useShibaSwapStakedBalance";

const fixedFormatting = (value: BigNumber, decimals?: number) => {
    return Fraction.from(value, BigNumber.from(10).pow(BigNumber.from(decimals))).toString(decimals)
}

export default function InputGroup({
    pairAddress,
    pid,
    pairSymbol,
    token0Address,
    token1Address,
    type,
    assetSymbol,
    assetDecimals = 18
}: {
    pairAddress: string
    pid: number
    pairSymbol: string
    token0Address: string
    token1Address: string
    type?: string
    assetSymbol?: string
    assetDecimals?: number
}): JSX.Element {
    const history = useHistory()
    const { account, chainId } = useActiveWeb3React()
    const [pendingTx, setPendingTx] = useState(false)
    const [depositValue, setDepositValue] = useState('')
    const [withdrawValue, setWithdrawValue] = useState('')

    const pairAddressChecksum = isAddressString(pairAddress)

    //const { deposit } = useBentoBox()
    const balance = useTokenBalance(pairAddressChecksum)
    const staked = useShibaSwapStakedBalance(pid, assetDecimals) // kMP depends on decimals of asset, SLP is always 18
    const pendingBone = useShibaSwapPendingBone(pid)

    //console.log('pending:', pending, pid)

    const [approvalState, approve] = useApproveCallback(
        new TokenAmount(
            new Token(chainId || 1, pairAddressChecksum, balance.decimals, pairSymbol, ''),
            ethers.constants.MaxUint256.toString()
        ),
        SHIBASWAP_TOPDOG_ADDRESS[chainId || 1]
    )

    const { deposit, withdraw, harvest } = useTopDog()

    //console.log('depositValue:', depositValue)

    return (
        <>
            <div className="flex flex-col space-y-4 py-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 px-4">
                    {type === 'LP' && (
                        <>
                            <Button
                                color="default"
                                onClick={() => history.push(`/add/${isWETH(token0Address)}/${isWETH(token1Address)}`)}
                            >
                                Add Liquidity
                            </Button>
                            <Button
                                color="default"
                                onClick={() =>
                                    history.push(`/remove/${isWETH(token0Address)}/${isWETH(token1Address)}`)
                                }
                            >
                                Remove Liquidity
                            </Button>
                        </>
                    )}
                </div>

                {(approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING) && (
                    <div className="px-4">
                        <Button color="blue" disabled={approvalState === ApprovalState.PENDING} onClick={approve}>
                            {approvalState === ApprovalState.PENDING ? <Dots>Approving </Dots> : 'Approve'}
                        </Button>
                    </div>
                )}
                {approvalState === ApprovalState.APPROVED && (
                    <div className="grid gap-4 grid-cols-2 px-4">
                        {/* Deposit */}
                        <div className="text-center col-span-2 md:col-span-1">
                            {account && (
                                <div className="text-sm text-secondary cursor-pointer text-right mb-2 pr-4">
                                    Wallet Balance: {formattedNum(fixedFormatting(balance.value, balance.decimals))}{' '}
                                    {type}
                                </div>
                            )}
                            <div className="flex items-center relative w-full mb-4">
                                <NumericalInput
                                    className="w-full p-3 bg-input rounded"
                                    value={depositValue}
                                    onUserInput={value => {
                                        setDepositValue(value)
                                    }}
                                />
                                {account && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setDepositValue(fixedFormatting(balance.value, balance.decimals))
                                        }}
                                        className="absolute right-4 border-0 bg-transparent p-3 rounded focus:outline-none bg-transparent hover:bg-primary border border-low-emphesis rounded-full py-1 px-2 text-secondary text-xs font-medium whitespace-nowrap ml-3 max"
                                    >
                                        MAX
                                    </Button>
                                )}
                            </div>
                            <Button
                                color="blue"
                                disabled={
                                    pendingTx ||
                                    !balance ||
                                    Number(depositValue) === 0 ||
                                    Number(depositValue) > Number(fixedFormatting(balance.value, balance.decimals))
                                }
                                onClick={async () => {
                                    setPendingTx(true)
                                    await deposit(pid, depositValue, pairSymbol, balance.decimals)
                                    setPendingTx(false)
                                }}
                            >
                                Deposit
                            </Button>
                        </div>
                        {/* Withdraw */}
                        <div className="text-center col-span-2 md:col-span-1">
                            {account && (
                                <div className="text-sm text-secondary cursor-pointer text-right mb-2 pr-4">
                                    Deposited: {formattedNum(fixedFormatting(staked.value, staked.decimals))} {type}
                                </div>
                            )}
                            <div className="flex items-center relative w-full mb-4">
                                <NumericalInput
                                    className="w-full p-3 bg-input rounded"
                                    value={withdrawValue}
                                    onUserInput={value => {
                                        setWithdrawValue(value)
                                    }}
                                />
                                {account && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setWithdrawValue(fixedFormatting(staked.value, staked.decimals))
                                        }}
                                        className="absolute right-4 border-0 bg-transparent p-3 rounded focus:outline-none bg-transparent hover:bg-primary border border-low-emphesis rounded-full py-1 px-2 text-secondary text-xs font-medium whitespace-nowrap ml-3 max"
                                    >
                                        MAX
                                    </Button>
                                )}
                            </div>
                            <Button
                                className="border-0 bg_green_01"
                                disabled={
                                    pendingTx ||
                                    Number(withdrawValue) === 0 ||
                                    Number(withdrawValue) > Number(fixedFormatting(staked.value, staked.decimals))
                                }
                                onClick={async () => {
                                    setPendingTx(true)
                                    await withdraw(pid, withdrawValue, pairSymbol, balance.decimals)
                                    setPendingTx(false)
                                }}
                            >
                                Withdraw
                            </Button>
                        </div>
                    </div>
                )}
                {pendingBone && Number(pendingBone) > 0 && (
                    <div className=" px-4">
                        <Button
                            color="default"
                            onClick={async () => {
                                setPendingTx(true)
                                await harvest(pid, pairSymbol)
                                setPendingTx(false)
                            }}
                        >
                            Harvest{'  '}
                            {formattedNum(pendingBone)} BONE
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}
