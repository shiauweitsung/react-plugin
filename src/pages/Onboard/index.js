import React from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

const injected = injectedModule()

const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3`

// initialize Onboard
init({
    wallets: [injected],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl
        }
    ]
})

export default function Onboard() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

    // create an ethers provider
    let ethersProvider

    if (wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
    console.log(wallet);

    return (
        <div>
            connect wallet page
            <button
                disabled={connecting}
                onClick={() => (wallet ? disconnect({ label: wallet.label }) : connect())}
            >
                {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
            </button>
        </div>
    )
}