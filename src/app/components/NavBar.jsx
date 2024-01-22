'use client'
import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image'
import axios from "axios"
import Link from 'next/link'
import {MdOutlineClose} from 'react-icons/md';
import {TbChartArrowsVertical} from 'react-icons/tb';


import Style from './NavBar.module.css'

const NavBar = () => {

  // UseStates
  const [userAccount, setUserAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [count, setCount] = useState('');
  const [openModel, setOpenModel] = useState(true);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState('');

  // Open Modal Box
  const openUserInfo = () => {
    if(openModel){
      setOpenModel(false);
    } else if(!openModel){
      setOpenModel(true);
    }
  }

  // Ether Price
  const getEtherPrice = async () => {
    try {
      const API_ETHER_KEY = 'RUH72QIAJU8H4RVE9XECBGIW138UKI2UGZ';
      axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_ETHER_KEY}`)
      .then((response)=> {
        setPrice(response.data.result);
        console.log(response.data.result);

        const timeStamp = Number(response.data.result.ethusd_timestamp);
        const date = new Date(timeStamp);
        setUpdatedPriceDate("Update:" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

        axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${API_ETHER_KEY}`)
        .then((response) => {
          setEtherSupply(response.data.result);
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Connect to Wallet Accounts 
  const checkIfAccountExist = async() => {
    try {
      if(!window.ethereum) return Console.log("Please install MetaMask");

      const accounts = await window.ethereum.request({method: "eth_accounts"});
      if(accounts.length){
        setUserAccount(accounts[0]);
      }

      const getBlance = await provider.getBalance(accounts[0]);
      const transactionCount = await provider.getTransactionCount(accounts[0]);
      setCount(transactionCount);
      const showBalance = ethers.utils.formatUnits(getBlance);
      setBalance(showBalance);
    } catch (error) {
      console.log(error);
    }
  }

  // Connect to Wallet
  const connectWallet = async () => {
    try {
      if(!window.ethereum) return Console.log("Please install MetaMask");
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
      if(accounts.length){
        setUserAccount(accounts[0]);
      } else {
        console.log("Sorry you donnot have account");
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getEtherPrice();
    checkIfAccountExist();
  }, [])

  return (
    <div>
      <div className={Style.navbar}>
        <div className={Style.navbar__container}>
          {/* Left Side */}
          <div className={Style.left}>
            <Link href="/">
              <div>
                <h1 className={Style.desktop}>Ether Finance</h1>
                <h1 className={Style.mobile}>
                  <Image src='/ether.png' alt='logo' width={50} height={50}/>
                </h1>
              </div>
            </Link>
          </div>
          {/* Right Side */}
          <div className={Style.right}>
            {userAccount.length ? (
                <div className={Style.connected}>
                  <button onClick={()=>openUserInfo()}>
                    Acc: {userAccount.slice(0, 10)}...
                  </button>
                  {openModel? (
                    <div className={Style.userModal}>
                      <div className={Style.user_box}>
                        <div className={Style.closeBtn}>
                          <MdOutlineClose onClick={()=>openUserInfo()}/>
                        </div>
                          <Image src='/avatar.jpg' alt='User' width={50} height={50}/>
                          <p>Acc: &nbsp; {userAccount.slice(0, 10)}</p>
                          <p>Balance: &nbsp; {balance} ETH</p>
                          <p>Total Transaction: &nbsp; {count} ETH</p>
                      </div>
                    </div>
                  ): ("")}`
                </div>
              ) : (
                <button onClick={()=> connectWallet()}>Connect Wallet</button>
              )
            }
          </div>
        </div>
      </div>

      <div className={Style.price}>
        <div className={Style.price__box}>
          <div className={Style.etherPrice}>
            <div>
              <Image src='/ethericon.png' alt='ether logo' width={30} height={30}/>
            </div>
            <div>
              <h4>ETHER PRICE</h4>
              <p>$ &nbsp;{price.ethusd}</p>
              <p>{price.ethbtc} &nbsp;BTC ₿</p>
              <p>{updatedPriceDate} </p>
            </div>
          </div>
          <div className={Style.supplyEther}>
            <div>
              <TbChartArrowsVertical className={Style.supplyIcon}/>
            </div>
            <div>
              <h4>TOTAL Ether SUPPLY</h4>
              <p>{etherSupply}</p>
              <p>Updated Supply data</p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>

        <div className={Style.price__box}>
          <div className={Style.tokenBox__logo}>
            <Image src='/etherlogo.png' alt='logo' width={200} height={200}/>
          </div>
          <div  className={Style.logoWidth}>
            <p>ERC20</p>
            <p>ERC21</p>
            <p>ERC1155</p>
            <p>CONTRACT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar