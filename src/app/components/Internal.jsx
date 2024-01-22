import React, {useState, useEffect} from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import Link from 'next/link'
import Style from './Tabel.module.css'


const Internal = ({internalByAddress, handleClick}) => {
  return (
    <div className={Style.internal}>
      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>Hash</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
              <AiFillEye/>
              <p>{el.hash.slice(0, 35)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>Block</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
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
          <p>TraceId</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
                <p>{el.traceId}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>TimeStamp</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
                <p>{el.timeStamp}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>From</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
              <p className={Style.toLink}>
                <Link href={{pathname: '/account', query: `acc=${el.From}`}} legacyBehavior>
                    <a onClick={handleClick}>{el.from.slice(0, 30)}...</a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>To</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
              <p className={Style.toLink}>
                <Link href={{pathname: '/account', query: `acc=${el.to}`}} legacyBehavior>
                    <a onClick={handleClick}>{el.to.slice(0, 30)}...</a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={Style.coloum}>
        <div className={Style.tableTitle}>
          <p>Value</p>
        </div>
        <div className={Style.tableInfo}>
          {internalByAddress.map((el, i)=> (
            <div key={i+1} className={Style.transHash}>
              <AiFillEye/>
              <p>{el.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Internal