'use client'
import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

const API_KEY = '6c51b9425df941609758b5288634535f';
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${API_KEY}`);

export const EtherScan = React.createContext();

export const EtherProvider = ({children}) => {
    const data = 'EtherScan Clone';
    const tenBlockWithDetails = [];
    const [yourBlockTrans, setYourBlockTrans] = useState(tenBlockWithDetails);
    const [currentBlock, setCurrentBlock] = useState([]);
    const [topTenBlock, setTopTenBlock] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [gasPrice, setGasPrice] = useState("");

    const accountDetails = async() =>{
        try {
            const getCurrentBlock = await provider.getBlockNumber();
            setCurrentBlock(getCurrentBlock);

            // Single Block Transaction
            const blockTransaction = await provider.getBlock(getCurrentBlock);
            setTransaction(blockTransaction.transactions);

            //Top Ten Blocks
            const previousBlock = getCurrentBlock - 10;
            const listTenBlock = [];

            for(let i=getCurrentBlock; i>previousBlock; i--) {
                listTenBlock.push([i]);
            }
            
            //Get Block Details
            const getBlockDetails = listTenBlock.flat();
            setTopTenBlock(getBlockDetails);

            getBlockDetails.map(async (el) => {
                const singleBlockData = await provider.getBlock(el);
                tenBlockWithDetails.push([singleBlockData]);
            });
            setYourBlockTrans(tenBlockWithDetails);

            // Ether Price
            const gasPrice = await provider.getFeeData();
            const latestGasPrice = ethers.formatEther(gasPrice.gasPrice);
            setGasPrice(latestGasPrice);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        accountDetails();
    }, [])

    return(
        <EtherScan.Provider value={{data, currentBlock, topTenBlock, yourBlockTrans, transaction, gasPrice, provider, API_KEY}}>
            {children}
        </EtherScan.Provider>
    )
}