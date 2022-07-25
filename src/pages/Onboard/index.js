import React, { useState } from 'react'
import { init, useConnectWallet, useSetChain } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import onboardIcon from '../../images/dick.png';
import walletAddressValidatorMinJs from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js'

const injected = injectedModule();

// const infuraKey = '<INFURA_KEY>';
const rpcUrl = `https://mainnet.infura.io/v3`;

// initialize Onboard
init({
    wallets: [injected],
    chains: [
        {
            id: '0x1',
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl
        },
        {
            id: '0x38',
            token: 'BNB',
            label: 'Smart Chain Mainnet',
            rpcUrl: 'https://bsc-dataseed.binance.org/',
            blockExplorerUrl: 'https://bscscan.com/',
        },
        {
            id: '0x343A',
            token: 'TACT',
            label: 'Amino X Testnet',
            rpcUrl: 'https://aminoxtestnet.node.alphacarbon.network/',
            blockExplorerUrl:
                'https://aminoxtestnet.blockscout.alphacarbon.network/',
        },
    ],
    appMetadata: {
        name: 'React plugin onboard',
        icon: onboardIcon,
        description: 'test onboard'
    }
})

export default function Onboard() {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
    const [
        {
            // chains, // the list of chains that web3-onboard was initialized with
            // connectedChain, // the current chain the user's wallet is connected to
            // settingChain, // boolean indicating if the chain is in the process of being set
        },
        setChain, // function to call to initiate user to switch chains in their wallet
    ] = useSetChain();
    // console.log(chains, connectedChain, settingChain, setChain);
    // create an ethers provider
    let ethersProvider;

    if (wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    }
    // console.log(wallet);

    const [tronAddress, setTronAddress] = useState();
    const [errorTron, setErrorTron] = useState(false);

    const tronChange = (event) => {
        let val = event.target.value;
        setTronAddress(event.target.value);
        const valid = walletAddressValidatorMinJs.validate(val, 'Tron');
        if (valid) {
            setErrorTron(false);
        } else {
            setErrorTron(true);
        }
    }

    return (
        <div>
            connect wallet page
            <button
                disabled={connecting}
                onClick={() => (wallet ? disconnect({ label: wallet.label }) : connect())}
            >
                {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
            </button>
            <button onClick={async () => {
                await setChain({
                    chainId: '0x343a',
                })
            }}>
                click set aminoX chain
            </button>
            <br />
            <label style={{ display: 'block', marginTop: '24px' }} htmlFor="address">Tron address validate</label>
            <input
                style={{
                    width: '300px'
                }}
                type="text"
                name="address"
                value={tronAddress}
                onChange={tronChange}
            />
            {errorTron ? <>error</> : null}

        </div>
    )
}