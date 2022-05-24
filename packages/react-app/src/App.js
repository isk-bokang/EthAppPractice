import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import {   DAppProvider, useEtherBalance, useEthers,  useTokenBalance, Goerli, useSendTransaction, useContractFunction} from '@usedapp/core'
import { key } from './Keys'

import { MaskConnection } from './components/MaskConnect'

import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import {abis, addresses} from '@my-app/contracts' 

const curChainID = Goerli.chainId

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://eth-goerli.alchemyapi.io/v2/" + key.Alchemy,
  },
}


const myTokenAddress = key.TokenAddress

ReactDOM.render(
  <DAppProvider config={config}>
    <BalanceDiv />
    <TransferDiv/>
  </DAppProvider>,
  document.getElementById('root')
)

export function BalanceDiv() {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account, { chainId: curChainID })
  const tokenBalance = useTokenBalance(myTokenAddress, account, { chainId: curChainID })

  return (
    <div>
      {<h3>Balance Div</h3>}
      <MaskConnection/>
      {etherBalance && <p>Ether Balance: {formatEther(etherBalance) } ETH</p>}
      {tokenBalance && <p>Token Balance: {formatEther(tokenBalance) * 10 * (10**17)} MET</p>}

    </div>
  )
}


export function TransferDiv() {

  let targAddress = " ";
  let amountOfMET = 0;

  const METInterface = new utils.Interface(abis.MET);
  const MetContractAddress = addresses.MET;
  const contract = new Contract(MetContractAddress, METInterface);

  const {state, send} = useContractFunction(contract, "transfer")

  const onClickSend = () => {
    
    send(targAddress , amountOfMET)
    console.log(state)
  }

  return (
      <div>
        <h3>Transfer MET</h3>
        <MaskConnection/>
        <table>
          <tr>
            <td>TO</td>
            <td><input type = "text"  onInput={e=> targAddress = e.target.value}></input></td>
          </tr>
          <tr>
            <td>AMOUNT</td>
            <td><input type="number" onInput={e=> amountOfMET = e.target.value}></input></td>
          </tr>
          <tr>
            <td colSpan={2}> <button onClick={onClickSend}> Transfer</button> </td>
          </tr>
        </table>
      </div>
    );
}