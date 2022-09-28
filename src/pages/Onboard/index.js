import React, { useEffect, useState } from 'react';
import { init, useConnectWallet, useSetChain } from '@web3-onboard/react';
// import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';
// import web3 from 'web3';
import onboardIcon from '../../images/dick.png';
import walletAddressValidatorMinJs from '@swyftx/api-crypto-address-validator/dist/wallet-address-validator.min.js';
import { carbonWallet } from './injectCarbon';
import abi from './abi.json';

const injected = injectedModule({
  custom: [carbonWallet]
});

// const infuraKey = '<INFURA_KEY>';
const rpcUrl = 'https://mainnet.infura.io/v3';
// const delay = (ms) => {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

// typescript use import { isValid, preCheck } from 'cryptocurrency-address-checker';
// yarn add cryptocurrency-address-checker

// or use https://www.npmjs.com/package/crypto-address-validator-ts

// validate(value, 'Tron', {
//   networkType: 'both',
//   chainType: '',
// })

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
      blockExplorerUrl: 'https://bscscan.com/'
    },
    {
      id: '0x343A',
      token: 'TACT',
      label: 'Amino X Testnet',
      rpcUrl: 'https://aminoxtestnet.node.alphacarbon.network/',
      blockExplorerUrl:
        'https://aminoxtestnet.blockscout.alphacarbon.network/'
    }
  ],
  appMetadata: {
    name: 'React plugin onboard',
    icon: onboardIcon,
    description: 'test onboard'
  }
});

export default function Onboards () {
  const [{ wallet, connecting }, connect, disconnect, updateBalances] = useConnectWallet();
  const [
    // {
    // chains, // the list of chains that web3-onboard was initialized with
    // connectedChain, // the current chain the user's wallet is connected to
    // settingChain, // boolean indicating if the chain is in the process of being set
    // },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  // console.log(chains, connectedChain, settingChain, setChain);
  // create an ethers provider
  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
    console.log(ethersProvider, 'ethersProvider');
  }
  // console.log(wallet);

  const [tronAddress, setTronAddress] = useState();
  const [errorTron, setErrorTron] = useState(false);
  const [account, setAccount] = useState();
  const [carbonProvider, setCarbonProvider] = useState();
  const [tokenBalance, setTokenBalance] = useState();

  const tronChange = (event) => {
    const val = event.target.value;
    setTronAddress(event.target.value);
    const valid = walletAddressValidatorMinJs.validate(val, 'Tron');
    if (valid) {
      setErrorTron(false);
    } else {
      setErrorTron(true);
    }
  };

  useEffect(() => {
    const carbonProvider = wallet?.provider
      ? new ethers.providers.Web3Provider(wallet.provider)
      : undefined;
    setCarbonProvider(carbonProvider);
    console.log(wallet, 'wallet');
  }, [wallet]);

  useEffect(() => {
    console.log(account, 'account');
    console.log(carbonProvider, 'carbonProvider');
  }, [account, carbonProvider]);

  useEffect(() => {
    console.log(tokenBalance, 'tokenBalance');
  }, [tokenBalance]);

  return (
    <div className='onboard'>
      connect wallet page
      <button
        disabled={connecting}
        onClick={() => (wallet
          ? disconnect({ label: wallet.label })
          : connect())}
      >
        {connecting
          ? 'connecting'
          : wallet
            ? 'disconnect'
            : 'connect'}
      </button>
      <button onClick={() => {
        updateBalances();
      }}>
        update balance
      </button>
      <button onClick={async () => {
        await setChain({
          chainId: '0x343a'
        });
      }}>
        click set aminoX chain
      </button>
      <button onClick={async () => {
        const carbon = window.carbon;
        const accounts = await carbon.request({ method: 'eth_requestAccounts' });
        setAccount(accounts);
      }}>
        get Account
      </button>
      <button onClick={async () => {
        const carbon = window.carbon;
        const tokenAddress = '0xCb5e100fdF7d24f25865fa85673D9bD6Bb4674ab';
        const tokenSymbol = 'TACT';
        const tokenDecimals = 18;
        const tokenImage = 'http://placekitten.com/200/300';
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await carbon.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage // A string url of the token logo
              }
            }
          });

          if (wasAdded) {
            console.log('Thanks for your interest!');
          } else {
            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
        }
      }}>
        add token
      </button>
      <button onClick={async () => {
        const carbon = window.carbon;
        carbon.request({
          method: 'eth_getBalance',
          params: ['0xE399C86c2370cCe714841e4d869e61450CD9f9de', 'latest']
        })
          .then((txHash) => console.log(txHash))
          .catch((error) => console.log(error));
      }}>
        get balance
      </button>
      <button onClick={async () => {
        // const contract = new ethers.Contract(
        //     '0xCb5e100fdF7d24f25865fa85673D9bD6Bb4674ab',
        //     contractAbi,
        //     carbonProvider.getSigner(),
        // );
        const contract = new ethers.Contract(
          '0xCb5e100fdF7d24f25865fa85673D9bD6Bb4674ab',
          abi,
          carbonProvider.getSigner()
        );
        console.log(contract, 'contract');
        // const balance = (
        //     await contract.balanceOf((await carbonProvider.getSigner())))
        const balance = (
          await contract.balanceOf(('0xE399C86c2370cCe714841e4d869e61450CD9f9de')));

        setTokenBalance(balance);
      }}>
        get token balance
      </button>
      <button onClick={() => {
        const carbon = window.carbon;
        carbon.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account[0],
              to: '0xE399C86c2370cCe714841e4d869e61450CD9f9de',
              value: '0x29a2241af62c0000',
              gasPrice: '0x09184e72a000',
              gas: '0x5208'
            }
          ]
        })
          .then((txHash) => console.log(txHash))
          .catch((error) => console.log(error));
      }}>
        sign Transaction
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
      {errorTron
        ? <>error</>
        : null}

    </div>
  );
}
