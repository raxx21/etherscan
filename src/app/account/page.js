'use client'
import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { EtherScan } from '@/app/Context/Ether'
import Style from './account.module.css' 
import Tabel from '@/app/components/Tabel'
import { ethers } from 'ethers'


const account = () => {

  const {provider} = useContext(EtherScan);
  const searchParams = useSearchParams();
  const acc = searchParams.get('acc');
  const API_KEY = 'RUH72QIAJU8H4RVE9XECBGIW138UKI2UGZ';

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [totalTransaction, setTotalTransaction] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const [accountHistory, setAccountHistory] = useState([]);
  const [internalByAddress, setInternalByAddress] = useState([]);
  const [ERC20, setERC20] = useState([]);
  const [ERC21, setERC21] = useState([]);
  const [ERC1155, setERC1155] = useState([]);
  const [blockMindedByAddress, setBlockMindedByAddress] = useState([]);
  const [blockrangeTransaction, setBlockrangeTransaction] = useState([]);

  const accountData = async() => {
    try {
      setAccount(acc);
      if (open){
        setOpen(false);
      }

      const ESN = await provider.lookupAddress(acc);
      if(ESN === null) {
        setName('Hey There');
        setLoading(false);
      } else {
        setName(ESN);
        setLoading(false);
      }

      const accountBalanc = await provider.getBalance(acc);
      const showBalance = ethers.formatEther(accountBalanc);
      setBalance(showBalance);

      // Transaction History
      axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
      .then((resopnse)=> {
        const accountHistory = resopnse.data.result;
        setAccountHistory(accountHistory);
      });

      // Transaction by Internal Hash
      axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
      .then((response)=> {
        const innerData = response.data.result;
        setInternalByAddress(innerData);
      });

      // EtherScan API ERC20 Token
      axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`)
      .then((response)=> {
        const tokenERC20 = response.data.result;
        setERC20(tokenERC20);
      });

      // EtherScan API Validated Blocked by Address
      axios.get(`https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&page=1&offset=10&apikey=${API_KEY}`)
      .then((resopnse) => {
        const blockedMindByAddress = resopnse.data.result;
        setBlockMindedByAddress(blockedMindByAddress);
      });

      // EtherScan API Block Range
      axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
      .then((response)=>{
        const transactionByBlockRange = response.data.result;
        setBlockrangeTransaction(transactionByBlockRange);
      });

      // EtherScan API ERC21 Token
      axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${acc}&address=0x6975be450864c02b4613023c2152ee0743572325&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_KEY}`)
      .then((response)=>{
        const tokenERC21 = response.data.result;
        setERC21(tokenERC21);
      });

      // EtherScan API ERC1155 Token
      axios.get(`https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=${acc}&address=0x83f564d180b58ad9a02a449105568189ee7de8cb&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`)
      .then((response)=>{
        const tokenERC1155 = response.data.result;
        setERC1155(tokenERC1155);
      });

      const totalTransaction = await provider.getTransactionCount(acc);
      setTotalTransaction(totalTransaction);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={Style.accountDIV}>
      {open ? (
        <div className={Style.btnContainer}>
          <h1>
            {open ? "Welcome To Ether Finance"
            : "Please wait we are loading data"}
          </h1>
          <button className={Style.openBtn} onClick={() => accountData()}>Click Me</button>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className={Style.loading}>
              <Image src='/loader.gif' alt='loading' width={100} height={100}/>
            </div>
          ) : (
            ""
          )}

          {!loading ? (
            <div className={Style.conatiner}>
              <div className={Style.box}>
                <div className={Style.account}>
                  <Image src='/ethericon.png' alt='Logo' width={30} height={30}/>
                  <p>
                    Address: <span>{acc}</span>
                  </p>
                </div>
                <div className={Style.owner}>
                  <p onClick={()=> accountData()}>Owner</p>
                  {name || "Hello Brother"}
                </div>
              </div>
              <div className={Style.overviewBox}>
                <div className={Style.overview}>
                  <div className={Style.overviewtitle}>
                    <p>Overview</p>
                    <p className={Style.miner}>
                      {name || "Miner"}: &nbsp; {account.slice(0,10)}...
                    </p>
                  </div>

                  <div className={Style.accountBalance}>
                    <p className={Style.color}>Balance</p>
                    <p>{balance} ETH</p>
                  </div>

                  <div className={Style.accountBalance}>
                    <p className={Style.color}>Value</p>
                    <p>$ {balance* 1057.28}</p>
                  </div>
                </div>
                
                <div className={Style.branding}>
                  <h2>
                    Welcome <br/>
                    Ether Finance Tracker
                  </h2>

                  <p>
                    Hey, welcome to ether finance tracker, find out yourBlockTrans
                    {name || account.slice(0,10)} &nbsp; financial status.
                  </p>
                </div>
              </div>
            </div>
          ): ("")}

          {!loading ? <Tabel 
          accountHistory={accountHistory}
          totalTransaction={totalTransaction}
          internalByAddress={internalByAddress}
          ERC20={ERC20}
          ERC21={ERC21}
          ERC1155={ERC1155}
          accountData={accountData}
          blockMindedByAddress={blockMindedByAddress}
          blockrangeTransaction={blockrangeTransaction}
          /> : ""}
        </div>
      )}
    </div>
  )
}

export default account