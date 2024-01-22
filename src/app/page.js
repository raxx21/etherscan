'use client'
import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {ethers} from 'ethers'
import Link from 'next/link'
import {SiMinutemailer} from 'react-icons/si'

import Style from './Home.module.css'
import { EtherScan } from './Context/Ether'


const Home = () => {
  const router = useRouter();
  const {yourBlockTrans, transaction} = useContext(EtherScan);
  const [userAccount, setUserAccount] = useState('');

  const convertIntoETH = (amount) => {
    const ETH = ethers.formatEther(amount);
    return ETH;
  }

  // Imput Adress
  const accountAddress = (event) => {
    event.preventDefault();
    const address = document.getElementById("accountAddress").ariaValueMax.trim();
    setUserAccount(address);
    router.push(`/account${address}`);
  }

  return (
    <div>
      <div className={Style.header}>
        <form className={Style.accountAddress}>
          <input type='text' placeholder='Ether Account Address' id='accountAddress'/>
          <Link href={{pathname: `/account/`, query: `acc=${userAccount}`}} legacyBehavior>
            <a onClick={(event)=> accountAddress(event)}>
              <SiMinutemailer/>
            </a>
          </Link>
        </form>
      </div>

      {/* Main Section */}
      <div className={Style.container}>
        <div className={Style.container__box}>
          <h3>Latest Blocks</h3>
          <div className={Style.container__block}>
            {yourBlockTrans.map((el,i)=>(
              <div className={Style.oneBlock} key={i+1}>
                <div className={Style.block}>
                  <div className={Style.info}>
                    <p className={Style.bk}>BK</p>
                    <Link href={{pathname: '/block', query: `block=${el[0].number}`}}>
                      {el[0].number}
                    </Link>
                  </div>
                  <p>{el[0].timestamp}</p>
                </div>
                <div>
                  <div className={Style.miner}>
                    <p>
                      <samp>Miner: &nbsp;&nbsp; 
                        <Link className={Style.link} href={{pathname: '/account/', query: `acc=${el[0].miner}`}} legacyBehavior>
                          <a>{el[0].miner.slice(0, 35)}</a>
                        </Link>
                      </samp>
                    </p>
                    <span>
                    <Link className={Style.link} href={{pathname: '/account/', query: `acc=${el[0].number}`}} legacyBehavior>
                      <a>{el[0].transactions.length}</a>
                    </Link>
                    &nbsp; TNS in 3 Sec
                    </span>
                  </div>

                  <div className={Style.reward}>
                    <p>{convertIntoETH(el[0].baseFeePerGas)} <span>ETH</span></p>
                    <Image src='/ethericon.png' className={Style.eth} alt='Ether Logo' width={10} height={10}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.container__box}>
          <h3>Latest Transaction</h3>
          <div className={Style.container__block}>
            {transaction.map((el,i)=>(
              <div className={Style.oneBlock} key={i+1}>
                <div className={Style.info}>
                  <div>
                    <p className={Style.bk}>TS</p>
                  </div>
                  <Link href={{pathname: '/transaction', query: `hash=${el}`}} legacyBehavior>
                    <a>Hash: &nbsp; {el.slice(0,55)}..</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home