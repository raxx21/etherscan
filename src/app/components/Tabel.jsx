import React, {useState, useEffect} from 'react'
import {FaFilter} from 'react-icons/fa'
import {AiFillEye} from 'react-icons/ai'
import Link from 'next/link'

import Style from './Tabel.module.css'
import Transaction from './Transaction'
import ERC20Token from './ERC20Token'
import ERC21Token from './ERC21Token'
import ERC1155Token from './ERC1155Token'
import Internal from './Internal'
import MindedBlock from './MindedBlock'
import BlockRange from './BlockRange'

const Tabel = ({
  accountHistory,
  totalTransaction,
  internalByAddress,
  ERC20,
  ERC21,
  ERC1155,
  accountData,
  blockMindedByAddress,
  blockrangeTransaction
}) => {

  const [historyAccount, setHistoryAccount] = useState(true);
  const [addressInternalTransaction, setAddressInternalTransaction] = useState(false);
  const [openERC20, setOpenERC20] = useState(false);
  const [addressByMindedBlock, setAddressByMindedBlock] = useState(false);
  const [transactionRangeBlock, setTransactionRangeBlock] = useState(false);
  const [openERC21, setOpenERC21] = useState(false);
  const [openERC1155, setOpenERC1155] = useState(false);

  const tabs = (e) => {
    const buttonText = e.target.innerText;
    setHistoryAccount(buttonText == 'Transaction');
    setAddressInternalTransaction(buttonText == 'Internal');
    setTransactionRangeBlock(buttonText == 'Trans')
    setAddressByMindedBlock(buttonText == 'Mined')
    setOpenERC20(buttonText == 'ERC-20')
    setOpenERC21(buttonText == 'ERC-21')
    setOpenERC1155(buttonText == 'ERC-1155')
  }

  return (
    <div className={Style.table}>
      <div className={Style.table__head}>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          Transaction
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          Internal
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          Trans
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          Mined
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          ERC-20
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          ERC-21
        </button>
        <button className={Style.btn} onClick={(e)=>tabs(e)}>
          ERC-1155
        </button>
      </div>

      <div className={Style.numberOfTrans}>
        <FaFilter/>
        <p> Latest 10 from a total of <span>{totalTransaction}</span></p>
      </div>

      {historyAccount ? (
        <Transaction 
        handleClick={accountData}
        accountHistory={accountHistory}
        />
      ): ("")}

      {addressInternalTransaction ? (
        <Internal 
        internalByAddress={internalByAddress}
        handleClick={accountData}
        />
      ) : ("")}

      {openERC20 ? <ERC20Token ERC20={ERC20} handleClick={accountData}/>: ""}

      {addressByMindedBlock ? (
        <MindedBlock 
        blockMindedByAddress={blockMindedByAddress} 
        handleClick={accountData}
        /> 
      ): ("")}

      {transactionRangeBlock ? (
        <BlockRange 
        blockrangeTransaction={blockrangeTransaction} 
        handleClick={accountData}
        /> 
      ): ("")}

      {openERC21 ? <ERC21Token ERC21={ERC21} handleClick={accountData}/> : ""}

      {openERC1155 ? <ERC1155Token ERC1155={ERC1155} handleClick={accountData}/> : ""}
    </div>
  )
}

export default Tabel