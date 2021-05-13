import { BigNumber } from '@ethersproject/bignumber'
import sushiData from '@sushiswap/sushi-data'
import { useActiveWeb3React } from 'hooks'
import { useBoringHelperContract } from 'hooks/useContract'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import {exchange, masterchef, shibaExchange, topDog} from 'apollo/client'
import { getAverageBlockTime } from 'apollo/getAverageBlockTime'
import {liquidityPositionSubsetQuery, pairSubsetQuery, poolsQuery, shibaSwapPoolsQuery} from 'apollo/queries'
import { POOL_DENY } from '../constants'
import { Fraction } from '../entities'

// Todo: Rewrite in terms of web3 as opposed to subgraph
const useShibaSwapFarms = () => {
    const [farms, setFarms] = useState<any | undefined>()
    const { account } = useActiveWeb3React()
    const boringHelperContract = useBoringHelperContract()

    const fetchAllFarms = useCallback(async () => {
        const results = await Promise.all([
            topDog.query({
                // results[0]
                query: shibaSwapPoolsQuery
            }),

            // shibaExchange.query({
            //     // results[1]
            //     query: liquidityPositionSubsetQuery,
            //     variables: { user: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd' }
            // }),
            // getAverageBlockTime(), // results[2]
            // sushiData.sushi.priceUSD(), // results[3]
            // sushiData.bentobox.kashiStakedInfo() //results[4]
        ])
        const pools = results[0]?.data.pools
        const pairAddresses = pools
            .map((pool: any) => {
                return pool.pair
            })
            .sort()
        const pairsQuery = await shibaExchange.query({
            query: pairSubsetQuery,
            variables: { pairAddresses }
        })

        console.log(pairsQuery);

        // const liquidityPositions = results[1]?.data.liquidityPositions
        // const averageBlockTime = results[2]
        // const sushiPrice = results[3]
        // const kashiPairs = results[4].filter(result => result !== undefined) // filter out undefined (not in onsen) from all kashiPairs


        const pairs = pairsQuery?.data.pairs
        // const KASHI_PAIRS = _.range(190, 230, 1) // kashiPair pids 189-229
        //console.log('kashiPairs:', KASHI_PAIRS, kashiPairs, pools)
        console.log(pools);
        const farms = pools
            .map((pool: any) => {
                    const pair : any = pairs.find((pair: any) => pair.id === pool.pair)
                    // const liquidityPosition = liquidityPositions.find(
                    //     (liquidityPosition: any) => liquidityPosition.pair.id === pair.id
                    // )
                    // const blocksPerHour = 3600 / averageBlockTime
                    const balance = 0//Number(pool.balance / 1e18) > 0 ? Number(pool.balance / 1e18) : 0.1
                    const totalSupply = 0//pair.totalSupply > 0 ? pair.totalSupply : 0.1
                    const reserveUSD = 0//pair.reserveUSD > 0 ? pair.reserveUSD : 0.1
                    const balanceUSD = 0//(balance / Number(totalSupply)) * Number(reserveUSD)
                    const rewardPerBlock = 0
                        // ((pool.allocPoint / pool.owner.totalAllocPoint) * pool.owner.sushiPerBlock) / 1e18
                    // const roiPerBlock = (rewardPerBlock * sushiPrice) / balanceUSD
                    // const roiPerHour = roiPerBlock * blocksPerHour
                    // const roiPerDay = roiPerHour * 24
                    // const roiPerMonth = roiPerDay * 30
                    // const roiPerYear = roiPerMonth * 12

                    return {
                        ...pool,
                        type: 'SSLP',
                        symbol: pair.token0.symbol + '-' + pair.token1.symbol,
                        name: pair.token0.name + ' ' + pair.token1.name,
                        pid: Number(pool.id),
                        pairAddress: pair.id,
                        sslpBalance: pool.balance,
                        liquidityPair: pair,
                        roiPerBlock : 0.1,
                        roiPerHour : 0.1,
                        roiPerDay : 0.1,
                        roiPerMonth : 0.1,
                        roiPerYear : 0.1,
                        rewardPerThousand: 0.1,//1 * roiPerDay * (1000 / sushiPrice),
                        tvl: 0.1 //liquidityPosition?.liquidityTokenBalance ? (pair.reserveUSD / pair.totalSupply) * liquidityPosition.liquidityTokenBalance : 0.1
                    }
            })

        //console.log('farms:', farms)
        const sorted = _.orderBy(farms, ['pid'], ['desc'])

        const pids = sorted.map(pool => {
            return pool.pid
        })

        // if (account) {
        //     const userFarmDetails = await boringHelperContract?.pollPools(account, pids)
        //     //console.log('userFarmDetails:', userFarmDetails)
        //     const userFarms = userFarmDetails
        //         .filter((farm: any) => {
        //             return farm.balance.gt(BigNumber.from(0)) || farm.pending.gt(BigNumber.from(0))
        //         })
        //         .map((farm: any) => {
        //             //console.log('userFarm:', farm.pid.toNumber(), farm)
        
        //             const pid = farm.pid.toNumber()
        //             const farmDetails = sorted.find((pair: any) => pair.pid === pid)
        
        //             console.log('farmDetails:', farmDetails)
        //             let deposited
        //             let depositedUSD
        //             // if (farmDetails && farmDetails.type === 'KMP') {
        //             //     deposited = Fraction.from(
        //             //         farm.balance,
        //             //         BigNumber.from(10).pow(farmDetails.liquidityPair.asset.decimals)
        //             //     ).toString()
        //             //     depositedUSD =
        //             //         farmDetails.totalAssetStaked && farmDetails.totalAssetStaked > 0
        //             //             ? (Number(deposited) * Number(farmDetails.tvl)) / farmDetails.totalAssetStaked
        //             //             : 0
        //             // } else {
        //                 deposited = Fraction.from(farm.balance, BigNumber.from(10).pow(18)).toString(18)
        //                 depositedUSD =
        //                     farmDetails.slpBalance && Number(farmDetails.slpBalance / 1e18) > 0
        //                         ? (Number(deposited) * Number(farmDetails.tvl)) / (farmDetails.slpBalance / 1e18)
        //                         : 0
        //             // }
        //             const pending = Fraction.from(farm.pending, BigNumber.from(10).pow(18)).toString(18)
        
        //             return {
        //                 ...farmDetails,
        //                 type: farmDetails.type, // KMP or SLP
        //                 depositedLP: deposited,
        //                 depositedUSD: depositedUSD,
        //                 pendingSushi: pending
        //             }
        //         })
        //     setFarms({ farms: sorted, userFarms: userFarms })
        //     //console.log('userFarms:', userFarms)
        // } else {
            setFarms({ farms: sorted, userFarms: [] })
        // }
    }, [account, boringHelperContract])

    useEffect(() => {
        fetchAllFarms()
    }, [fetchAllFarms])

    return farms
}

export default useShibaSwapFarms
