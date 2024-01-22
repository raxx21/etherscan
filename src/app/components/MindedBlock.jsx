import React from 'react'
import Image from "next/image";
import { FaFilter } from "react-icons/fa";
import { AilFillEye } from "react-icons/ai";
import Link from "next/link";

import Style from "./Tabel.module.css";
import { ethers } from 'ethers';

const MindedBlock = ({blockMindedByAddress, handleClick}) => {
  const convertIntoETH = (amount) => {
    const ETH = ethers.formatEther(amount);
    return ETH;
  }

  return (
    <div>
      {blockMindedByAddress.length === 0 ? (
        <div className={Style.sorry}>
          <p> Sorry There is no Data</p>
        </div>
      ): (
        <div className={Style.MindedBlock}>
          <div className={Style.coloum}>
            <div className={Style.tableTitle}>
              <p>Block</p>
            </div>
            <div className={Style.tableInfo}>
              {blockMindedByAddress.map((el, i)=> (
                <div key={i+1} className={Style.transHash}>
                  <p className={Style.toLink}>
                    <Link href={{pathname: '/block', query: `block=${el.blockNumber}`}} legacyBehavior>
                        <a onClick={handleClick}>{el.blockNumber}</a>
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.coloum}>
            <div className={Style.tableTitle}>
              <p>Block Reward</p>
            </div>
            <div className={Style.tableInfo}>
              {blockMindedByAddress.map((el, i)=> (
                <div key={i+1} className={Style.transHash}>
                  <p>{convertIntoETH(el.blockReward)} ETH</p>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.coloum}>
            <div className={Style.tableTitle}>
              <p>Time Stamp</p>
            </div>
            <div className={Style.tableInfo}>
              {blockMindedByAddress.map((el, i)=> (
                <div key={i+1} className={Style.transHash}>
                  <p>{el.timeStamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MindedBlock