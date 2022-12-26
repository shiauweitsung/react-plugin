import React, { useEffect, useState } from 'react';
import { init, useConnectWallet, useWallets } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { ethers } from 'ethers';
import carbonWallet from './carbonWallet';

type ILocalStorageWallet = {
  label: string;
  address: string[];
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const injected = injectedModule({
  custom: [carbonWallet],
});

const rpcUrl = 'https://mainnet.infura.io/v3';

// initialize Onboard
init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl,
    },
  ],
});
export default function AutoConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const localStorageWallet = JSON.parse(localStorage.getItem('connectWallet'));
  const [initWallet, setInitWallet] = useState(false);
  useEffect(() => {
    if (!wallet) return;
    const connectedWallet = connectedWallets
      .map((item) => {
        const address = item.accounts.map((accounts) => {
          return accounts.address;
        });
        return {
          label: item.label,
          address,
        };
      })
      .reverse();
    localStorage.setItem('connectWallet', JSON.stringify(connectedWallet));
    setInitWallet(true);
  }, [wallet, connectedWallets]);

  useEffect(() => {
    //auto connected wallet
    if (!localStorageWallet) return;
    (async () => {
      await delay(200);
      for (const item of localStorageWallet) {
        await connect({
          autoSelect: {
            label: item!.label,
            disableModals: true,
          },
        });
      }
      setInitWallet(true);
    })();
    console.log(localStorageWallet, 'localStorageWallet auto connect');
    console.log(initWallet, 'initWallet auto connect');
  }, []);

  useEffect(() => {
    //clean localstorage wallet
    if (connectedWallets.length === 0) {
      localStorage.removeItem('connectWallet');
      setInitWallet(false);
    }
  }, [connectedWallets]);

  if (!initWallet) {
    return (
      <div>
        <button
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
        >
          {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
        </button>
      </div>
    );
  }
  return <div onClick={() => connect()}>has auto connected</div>;
}
