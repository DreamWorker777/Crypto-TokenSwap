import { signERC2612Permit } from 'eth-permit'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import ReactGA from 'react-ga'
import {
    useActiveWeb3React,
    useShibaSwapUniV2FetchContract,
    useShibaSwapSushiFetchContract,
    useSushiRollContract
} from '../hooks'
import LPToken from '../types/LPToken'

const useShibaFetch = () => {
    const { library, account } = useActiveWeb3React()
    const shibaUniV2Fetch = useShibaSwapUniV2FetchContract()
    const ttl = 60 * 20

    const migrate = useCallback(
        async (lpToken: LPToken, amount: ethers.BigNumber) => {
            if (shibaUniV2Fetch) {
                const deadline = Math.floor(new Date().getTime() / 1000) + ttl
                const args = [
                    lpToken.tokenA.address,
                    lpToken.tokenB.address,
                    amount,
                    ethers.constants.Zero,
                    ethers.constants.Zero,
                    deadline
                ]

                const gasLimit = await shibaUniV2Fetch.estimateGas.migrate(...args)
                const tx = shibaUniV2Fetch.migrate(...args, {
                    gasLimit: gasLimit.mul(120).div(100)
                })

                ReactGA.event({
                    category: 'Migrate',
                    action: 'Uniswap->Sushiswap',
                    label: 'migrate'
                })

                return tx
            }
        },
        [shibaUniV2Fetch, ttl]
    )

    const migrateWithPermit = useCallback(
        async (lpToken: LPToken, amount: ethers.BigNumber) => {
            if (account && shibaUniV2Fetch) {
                const deadline = Math.floor(new Date().getTime() / 1000) + ttl
                const permit = await signERC2612Permit(
                    library,
                    lpToken.address,
                    account,
                    shibaUniV2Fetch.address,
                    amount.toString(),
                    deadline
                )
                const args = [
                    lpToken.tokenA.address,
                    lpToken.tokenB.address,
                    amount,
                    ethers.constants.Zero,
                    ethers.constants.Zero,
                    deadline,
                    permit.v,
                    permit.r,
                    permit.s
                ]

                const gasLimit = await shibaUniV2Fetch.estimateGas.migrateWithPermit(...args)
                const tx = await shibaUniV2Fetch.migrateWithPermit(...args, {
                    gasLimit: gasLimit.mul(120).div(100)
                })

                ReactGA.event({
                    category: 'Migrate',
                    action: 'Uniswap->Shibaswap',
                    label: 'migrateWithPermit'
                })

                return tx
            }
        },
        [account, library, shibaUniV2Fetch, ttl]
    )

    return {
        migrate,
        migrateWithPermit
    }
}

export default useShibaFetch
