'use client'
import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useSearchParams } from 'next/navigation'

import Style from '../components/Tabel.module.css'
import { EtherScan } from '../Context/Ether'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import StyleTransaction from './block.module.css'


const block = () => {

  const {provider} = useContext(EtherScan);
  const searchParams = useSearchParams();
  const blockNumber = Number(searchParams.get('block'));
  const dataBlock = [];

  const [open, setOpen] = useState(false);
  const [blockData, setBlockData] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const [ethGasLimit, setEthGasLimit] = useState('');
  const [ethDifficulty, setEthDifficulty] = useState('');
  const [ethGasUsed, setEthGasUsed] = useState('');

  const [blockNo, setBlockNo] = useState(true);
  const [transactionTab, setTransactionTab] = useState(false);

  const openTab = () =>{
    if (blockNo) {
      setBlockNo(false);
      setTransactionTab(true);
    } else if (transactionTab) {
      setBlockNo(true);
    }
  }

  const getBlockDetails = async () => {
    try {
      const getBlock = await provider.getBlock(blockNumber);
      dataBlock.push(getBlock);
      setBlockData(getBlock);
      
      const gasLimit = ethers.formatEther(getBlock.gasLimit);
      setEthGasLimit(gasLimit);

      const gasUsed = ethers.formatEther(getBlock.gasUsed);
      setEthGasUsed(gasUsed);

      const difficulty = ethers.formatEther(getBlock.difficulty);
      setEthDifficulty(difficulty);

      setTransaction(getBlock.transactions);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlockDetails();
  }, []);

  return (
    <div className={StyleTransaction.block}>
      <div className={Style.box}>
        <div className={StyleTransaction.box__header}>
          <h3>Block Number</h3>
          <p>{blockNumber}</p>
        </div>

        <div className={StyleTransaction.blockTable}>
          <div className={StyleTransaction.blockBtn}>
            <button onClick={() => openTab()}>Block Details</button>
            <button onClick={() => openTab()}>Block Transaction</button>
          </div>

          {blockNo ? (
            <div>
              <div className={StyleTransaction.dataRow}>
                <p>Number</p>
                <p>{blockData.number}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>TimeStamp</p>
                <p>{blockData.timestamp}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Miner</p>
                <Link href={{pathname: '/account', query: `acc=${blockData.miner}`}} legacyBehavior>
                  <p className={StyleTransaction.color}>{blockData.miner}</p>
                </Link>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Hash</p>
                <p>{blockData.hash}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>ParentHas</p>
                <p>{blockData.parentHash ? blockData.parentHash : "No Data"}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Nonce</p>
                <p>{blockData.nonce}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Extra Data</p>
                <p>{blockData.extraData}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Difficulty</p>
                <p>{blockData.difficulty? blockData.difficulty : "No Data"}</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Gas limit</p>
                <p>{ethGasLimit} ETH</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Gas Used</p>
                <p>{ethGasUsed} ETH</p>
              </div>

              <div className={StyleTransaction.dataRow}>
                <p>Gas Difficulty</p>
                <p>{ethDifficulty} ETH</p>
              </div>
            </div>
          ): (
            <div className={StyleTransaction.dataTable}>
              <div className={Style.coloum}>
                <div className={Style.tableTitle}>
                  <p>All Transaction in the block {transaction.length}</p>
                </div>
                <div className={Style.tableInfo}>
                  {transaction.map((el, i)=> (
                    <div key={i+1} className={Style.transHash}>
                      <span>{i+1}</span>
                      <Link href={{pathname: '/transaction', query: `hash=${el}`}} legacyBehavior>
                        <p className={StyleTransaction.color}>{el}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default block