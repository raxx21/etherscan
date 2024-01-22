'use client'
import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'

import StyleTransaction from '../block/block.module.css'
import { EtherScan } from '../Context/Ether'
import { useSearchParams } from 'next/navigation'

const transaction = () => {

  const {provider} = useContext(EtherScan);
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');

  const transDetails = [];
  const [transactionData, setTransactionData] = useState(transDetails);
  const [signature, setSignature] = useState('');

  const [ethGasLimit, setEthGasLimit] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [value, setValue] = useState('');

  const getdataOfTransaction = async () => {
    try {
      const transactionDetails = await provider.getTransaction(hash);
      setTransactionData(transactionDetails);
      transDetails.push(transactionDetails);
      console.log(transactionDetails);
      setSignature(transactionDetails.signature);

      const gasLimit = ethers.formatEther(transactionDetails.gasLimit);
      setEthGasLimit(gasLimit);

      const gasPriceCon = ethers.formatEther(transactionDetails.gasPrice);
      setGasPrice(gasPriceCon);

      const etherValue = ethers.formatEther(transDetails.value);
      setValue(etherValue);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getdataOfTransaction();
  }, [])

  return (
    <div className={StyleTransaction.block}>
      <div className={StyleTransaction.box}>
        <div className={StyleTransaction.box__header}>
          <h3>Transaction Hash</h3>
          <p>{hash}</p>
        </div>
        <div className={StyleTransaction.blockTable}>
          <div>
            <div className={StyleTransaction.dataRow}>
              <p>Number</p>
              <Link
                href={{
                  pathname: "/block",
                  query: `block=${transactionData.blockNumber}`,
                }}
              >
                <p className={StyleTransaction.color}>
                  {transactionData.blockNumber}
                </p>
              </Link>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Block Hash</p>
              <p>{transactionData.blockHash}</p>
            </div>

            <div className={StyleTransaction.dataRow}>
              <p>From</p>
              <Link
                href={{ pathname: "/account", query: `acc=${transactionData.from}` }}
              >
                <p className={StyleTransaction.color}>{transactionData.from}</p>
              </Link>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>To</p>
              <Link
                href={{ pathname: "/account", query: `acc=${transactionData.from}` }}
              >
                <p className={StyleTransaction.color}>{transactionData.to}</p>
              </Link>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Hash</p>
              <p>
                {transactionData.hash
                  ? transactionData.hash
                  : "No Data Avaliable"}
              </p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Nonce</p>
              <p>{transactionData.nonce}</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Transaction Index</p>
              <p>
                {transactionData.transactionIndex
                  ? transactionData.transactionIndex
                  : "No Data Avaliable"}
              </p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>R</p>
              <p>{signature.r}</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>S</p>
              <p>{signature.s}</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Gas Limit</p>
              <p>{ethGasLimit} ETH</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Gas Price</p>
              <p> {gasPrice} ETH</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Type</p>
              <p>{transactionData.type} </p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>V</p>
              <p>{signature.v} </p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Value</p>
              <p>{value} ETH</p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Chain Id</p>
              <p>{transactionData.chainId} </p>
            </div>
            <div className={StyleTransaction.dataRow}>
              <p>Transaction Index</p>
              <p>
                {transactionData.creates
                  ? transactionData.creates
                  : "No Data Avaliable"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default transaction