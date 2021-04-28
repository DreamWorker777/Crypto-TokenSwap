import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Fraction } from '../entities'
import { useActiveWeb3React, useSushiBarContract, useSushiContract, useShibaSwapTokenContract, useShibaSwapBuryTokenContract } from '../hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { BalanceProps } from './useTokenBalance'
import { Contract } from '@ethersproject/contracts'

const { BigNumber } = ethers

const useBury = (props:any) => {
    const { account } = useActiveWeb3React()
    const addTransaction = useTransactionAdder()

    console.log("props4", props);

    let tokenType = props.tokenType? props.tokenType.toUpperCase() : "SHIB";
    let tokenAddress = props.tokenAddress;

    const tokenContract= useShibaSwapTokenContract(tokenAddress,true);
    const buryContract = useShibaSwapBuryTokenContract(tokenType, true);
    
    //allowance state variable
    const [allowance, setAllowance] = useState('0')

    //Fetch Sushi Allowance
    const fetchAllowance = useCallback(async () => {
        if (account) {
            try {
                const allowance = await tokenContract?.allowance(account, buryContract?.address)
                const formatted = Fraction.from(BigNumber.from(allowance), BigNumber.from(10).pow(18)).toString()
                setAllowance(formatted)
            } catch {
                setAllowance('0')
            }
        }
    }, [account, buryContract, tokenContract])

    useEffect(() => {
        
        if (account && tokenContract && buryContract) {
            fetchAllowance()
        }
        const refreshInterval = setInterval(fetchAllowance, 10000)
        return () => clearInterval(refreshInterval)


    }, [account, buryContract, fetchAllowance, tokenContract])

    const approve = useCallback(async () => {
        try {
            const tx = await tokenContract?.approve(buryContract?.address, ethers.constants.MaxUint256.toString())
            return addTransaction(tx, { summary: 'Approve' })
        } catch (e) {
            return e
        }
    }, [addTransaction, buryContract, tokenContract])

    const enter = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: BalanceProps | undefined) => {
            if (amount?.value) {
                try {
                    const tx = await buryContract?.enter(amount?.value)
                    return addTransaction(tx, { summary: 'Enter SushiBar' })
                } catch (e) {
                    return e
                }
            }
        },
        [addTransaction, buryContract]
    )

    const leave = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: BalanceProps | undefined) => {
            if (amount?.value) {
                try {
                    const tx = await buryContract?.leave(amount?.value)
                    //const tx = await buryContract?.leave(ethers.utils.parseUnits(amount)) // where amount is string
                    return addTransaction(tx, { summary: 'Enter SushiBar' })
                } catch (e) {
                    return e
                }
            }
        },
        [addTransaction, buryContract]
    )

    return {allowance, approve, enter, leave}

}

export default useBury