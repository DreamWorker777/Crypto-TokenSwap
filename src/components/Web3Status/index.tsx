import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken, lighten } from 'polished'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
import LatticeIcon from '../../assets/images/gridPlusWallet.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { fortmatic, injected, lattice, portis, walletconnect, walletlink } from '../../connectors'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary } from '../ButtonLegacy'
import Identicon from '../Identicon'
import Loader from '../Loader'
import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'
import { ReactComponent as Chef } from '../../assets/images/chef.svg'

const IconWrapper = styled.div<{ size?: number }>`
    ${({ theme }) => theme.flexColumnNoWrap};
    align-items: center;
    justify-content: center;
    & > * {
        height: ${({ size }) => (size ? size + 'px' : '32px')};
        width: ${({ size }) => (size ? size + 'px' : '32px')};
    }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
    ${({ theme }) => theme.flexRowNoWrap}
    width: 100%;
    align-items: center;
    padding: 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    user-select: none;
    :focus {
        outline: none;
    }
`
const Web3StatusError = styled(Web3StatusGeneric)`
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
    color: ${({ theme }) => theme.white};
    font-weight: 500;
    :hover,
    :focus {
        background-color: ${({ theme }) => darken(0.1, theme.red1)};
    }
`
const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
    padding: 0.4rem 0.8rem;
    outline: none;
    background-color: white;
    border: solid 1px #919193;
    display: inline-block;
    border-radius: 20px;
    border-width: 1px;
    color: black;

    :hover{
        // font-family: Kanit, Avenir, Helvetica, Arial, sans-serif;
        // padding: 0.4rem 0.8rem;
        // outline: none;
        // background-color: white;
        // border: solid 1px #919193;
        // display: inline-block;
        // border-radius: 20px;
        // border-width: 2.5px;
        // color: black;
    }
`
// const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
//     background-color: ${({ theme }) => theme.primary4};
//     border: none;
//     color: ${({ theme }) => theme.primaryText1};
//     font-weight: 500;

//     :hover,
//     :focus {
//         border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
//         color: ${({ theme }) => theme.primaryText1};
//     }

//     ${({ faded }) =>
//         faded &&
//         css`
//             background-color: ${({ theme }) => theme.primary5};
//             border: 1px solid ${({ theme }) => theme.primary5};
//             color: ${({ theme }) => theme.primaryText1};

//             :hover,
//             :focus {
//                 border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
//                 color: ${({ theme }) => darken(0.05, theme.primaryText1)};
//             }
//         `}
// `

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
    background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
    border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
    color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
    font-weight: 500;
    font-family: Kanit;
    :hover,
    :focus {
        background-color: ${({ pending, theme }) =>
            pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2)};

        :focus {
            border: 1px solid
                ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
        }
    }
`

const Text = styled.p`
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0.5rem 0 0.25rem;
    font-size: 0.8rem;
    width: fit-content;
    font-weight: 500;
    font-family: 'Kanit'
`

const NetworkIcon = styled(Activity)`
    margin-left: 0.25rem;
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
    return b.addedTime - a.addedTime
}

const SOCK = (
    <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
        🧦
    </span>
)

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
    if (connector === injected) {
        return <></>
        // return <Identicon />
    } else if (connector === walletconnect) {
        return (
            <IconWrapper size={16}>
                <img src={WalletConnectIcon} alt={'Wallet Connect'} />
            </IconWrapper>
        )
    } else if (connector === lattice) {
        return (
            <IconWrapper size={16}>
                <img src={LatticeIcon} alt={'Lattice'} />
            </IconWrapper>
        )
    } else if (connector === walletlink) {
        return (
            <IconWrapper size={16}>
                <img src={CoinbaseWalletIcon} alt={'Coinbase Wallet'} />
            </IconWrapper>
        )
    } else if (connector === fortmatic) {
        return (
            <IconWrapper size={16}>
                <img src={FortmaticIcon} alt={'Fortmatic'} />
            </IconWrapper>
        )
    } else if (connector === portis) {
        return (
            <IconWrapper size={16}>
                <img src={PortisIcon} alt={'Portis'} />
            </IconWrapper>
        )
    }
    return null
}

function Web3StatusInner() {
    const { t } = useTranslation()
    const { account, connector, error } = useWeb3React()

    const { ENSName } = useENSName(account ?? undefined)

    const allTransactions = useAllTransactions()

    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions)
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
    }, [allTransactions])

    const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

    const hasPendingTransactions = !!pending.length

    const toggleWalletModal = useWalletModalToggle()

    if (account) {
        return (
            <div
                id="web3-status-connected"
                className="flex items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3"
                onClick={toggleWalletModal}
            >
                {hasPendingTransactions ? (
                    <div className="flex justify-between items-center">
                        <div className="pr-2">{pending?.length} Pending</div> <Loader stroke="white" />
                    </div>
                ) : (
                    <div className="mr-2">{ENSName || shortenAddress(account)}</div>
                )}
                {!hasPendingTransactions && connector && <StatusIcon connector={connector} />}
            </div>
        )
    } else if (error) {
        return (
            <Web3StatusError onClick={toggleWalletModal}>
                <NetworkIcon />
                <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
            </Web3StatusError>
        )
    } else {
        return (
            <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
                <p>Connect to your wallet</p>
            </Web3StatusConnect>
        )
    }
}

export default function Web3Status() {
    const { active, account } = useWeb3React()
    const contextNetwork = useWeb3React(NetworkContextName)

    const { ENSName } = useENSName(account ?? undefined)

    const allTransactions = useAllTransactions()

    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions)
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
    }, [allTransactions])

    const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
    const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

    if (!contextNetwork.active && !active) {
        return null
    }

    return (
        <>
            <Web3StatusInner />
            <WalletModal
                ENSName={ENSName ?? undefined}
                pendingTransactions={pending}
                confirmedTransactions={confirmed}
            />
        </>
    )
}
