import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther, formatUnits } from '@ethersproject/units'
import {   DAppProvider, useEtherBalance, useEthers,  useTokenBalance, Goerli, Localhost, useContractFunction, useCall, Call} from '@usedapp/core'
import { key } from './Keys'

import { MaskConnection } from './components/MaskConnect'

import { ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import {abis, addresses} from '@my-app/contracts' 

import { useEffect } from 'react'




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
    <NFTBalanceDiv/>
    <NFTTransfertDiv/>
  </DAppProvider>,
  document.getElementById('root')
)

export function BalanceDiv() {
  useEffect(()=>{
    return ()=>{
  
  }}, [])
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account, { chainId: curChainID })
  const tokenBalance = useTokenBalance(myTokenAddress, account, { chainId: curChainID })

  return (
    <div>
      {<h3>Balance Div</h3>}
      <MaskConnection/>
      {etherBalance && <p>Ether Balance: {formatEther(etherBalance) } ETH</p>}
      {tokenBalance && <p>Token Balance: { ethers.utils.formatUnits(tokenBalance, 0 ) } MET</p>}

    </div>
  )
}


export function TransferDiv() {
  useEffect(()=>{
    return ()=>{
  
  }}, [])
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
        <h3>Transfer MET Div</h3>
        <MaskConnection/>
        <table>
          <thead></thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    );
}


function useTotalSupply(tokenAddress, tokenContract) {
  const call = {
    "contract": tokenContract,
    "method": 'totalSupply',
    "args": []
  }
  const { value, error } = useCall(tokenAddress && call) ??{}
  if(error) {
    console.error(error.message)
    return undefined
  }
 
  return value?.[0]
}


export function NFTBalanceDiv(){

  useEffect(()=>{
    return ()=>{
  
  }}, [])

  const { account } = useEthers()

  let tokenBalance = useTokenBalance(addresses.METNFTE, account, { chainId: curChainID })

  const NFTInterface = new utils.Interface(abis.METNFTE);
  const NFTContractAddress = addresses.METNFTE;
  const tokenContract = new Contract(NFTContractAddress, NFTInterface)
  console.log(tokenContract)

  let totalSupply = useTotalSupply(NFTContractAddress, tokenContract);

  
  function sendTx(){
    
    console.log(NFTInterface)

  }

  return(
    <div>
      <h3>NFT Balance Div</h3>
      <MaskConnection/>
      { tokenBalance && <p>NFT Balance : { formatUnits(tokenBalance, 0 )}</p>}
      { totalSupply && <p>NFT TotalSupply : { formatUnits(totalSupply, 0) }</p>}
      { account && <button onClick={sendTx} > LOAD </button>}
    </div>
  )
}


export function NFTTransfertDiv(){
  useEffect(()=>{
    return ()=>{
  
  }}, [])

  const { account } = useEthers()

  let targAddress = " ";
  let amountOfNFT = 0;
  
  const NFTInterface = new utils.Interface(abis.METNFTE);
  const NFTContractAddress = addresses.METNFTE;
  const contract = new Contract(NFTContractAddress, NFTInterface);

  const {state, send} = useContractFunction(contract, "transferFrom")

  const onClickSend = () => {
    send(account, targAddress , amountOfNFT)
    console.log(state)
  }

  return (
      <div>
        <h3>Transfer NFT Div</h3>
        <MaskConnection/>
        <table>
          <thead></thead>
          <tbody>
          <tr>
            <td>TO</td>
            <td><input type = "text"  onInput={e=> targAddress = e.target.value}></input></td>
          </tr>
          <tr>
            <td>AMOUNT</td>
            <td><input type="number" onInput={e=> amountOfNFT = e.target.value}></input></td>
          </tr>
          <tr>
            <td colSpan={2}> <button onClick={onClickSend}> Transfer</button> </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
}