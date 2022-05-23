import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Localhost , Mainnet, DAppProvider, useEtherBalance, useEthers, Config , useTokenBalance, Goerli, useSendTransaction} from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { key } from './Keys'

const curChainID = Goerli.chainId

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://eth-goerli.alchemyapi.io/v2/" + key.Alchemy,
  },
}

console.log(Goerli)

const myTokenAddress = key.TokenAddress

ReactDOM.render(
  <DAppProvider config={config}>
    <BalanceDiv />
  </DAppProvider>,
  document.getElementById('root')
)

export function BalanceDiv() {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account, { chainId: curChainID })
  const tokenBalance = useTokenBalance(myTokenAddress, account, { chainId: curChainID })

  return (
    <div>
      <H3>Balance Div</H3>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Ether Balance: {formatEther(etherBalance) } ETH</p>}
      {tokenBalance && <p>Token Balance: {formatEther(tokenBalance) * 10 * (10**17)} MET</p>}

    </div>
  )
}


export function TransferDiv() {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  const {sendTransaction, state} = useSendTransaction();


  return (
    <div>
      <H3>Transfer</H3>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>FROM : {account}</p>}
      {account && <p>TO   : </p>}
      {account && <p>amount : </p> }
      {account && <input type="text"></input>}
      {account && <button onClick={deactivate}> Disconnect </button>}

    </div>
  )
}