import React from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import Loader from './Loader';
import OurService from './OurService';

const NFTContractAddress="0xAF5d37444Ece38a7C3eBE66254395Fb695C178Ec";
const abiNFTContract=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_NFTId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bidAmount",
				"type": "uint256"
			}
		],
		"name": "bidNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_NFTId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_NFTId",
				"type": "uint256"
			}
		],
		"name": "placeForBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_NFTId",
				"type": "uint256"
			}
		],
		"name": "placeForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_NFTId",
				"type": "uint256"
			}
		],
		"name": "sellToHighestBidder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listNFTs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "forSale",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "forbid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidder",
						"type": "address"
					}
				],
				"internalType": "struct NFT.NFTInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "listOwnerNFTs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "forSale",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "forbid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidder",
						"type": "address"
					}
				],
				"internalType": "struct NFT.NFTInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NFTId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "NFTs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "forSale",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "forbid",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var arraylist=[];
var whole=[];

function ListOwnedNft(props) {

    const [w1,setw1] = useState([]);

    async function getAllOwnerNfts() {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			arraylist = await NFTContract.listOwnerNFTs(String(props.currentAccount));
			console.log(arraylist)
			for(var i=0;i<arraylist.length;i++){
				whole[i]=arraylist[i];
			}
			setw1(whole);
			//console.log(whole)
		  }
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function startsell(id) {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			let txn = await NFTContract.placeForSale(id);
			//console.log(txn)

		  }
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function startbid(id) {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			let txn = await NFTContract.placeForBid(id);
			//console.log(txn)

		  }
		} catch (error) {
		  console.error(error);
		}
	  }

	  async function selltohighestbidder(id) {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			let txn = await NFTContract.sellToHighestBidder(id);
			//console.log(txn)

		  }
		} catch (error) {
		  console.error(error);
		}
	  }

      useEffect(() => {
		getAllOwnerNfts();
	  }, [])


  return (
	<><OurService p={"Your NFTs"}></OurService>
	 <Loader></Loader>
    <div className="d-flex flex-wrap justify-content-center">
      {whole.map((nft) => (
        <div class="card m-3 form-bg form-container">
		
            <span class="badge badge-success p-2" >{nft.NFTId}{nft.name}</span>
           
    
          <img
            src={nft.imageUrl}
            class="card-img-top p-1 rounded-circle"
            width="100px"
            height="200px"
          ></img>

			<span class="badge badge-danger p-2 m-2" >{" "}
				{nft.forSale ? `Price: ${nft.price} ETH` : "Not for sale"}</span>

			<span class="badge badge-danger p-2 m-2" >{nft.forbid ? `Bid Current Price: ${nft.highestBid} ETH` : "Not for Bid"}</span>
			<div class="d-flex justify-content-around">
          <h5 class="card-title text-center">
            {nft.forSale || (
              <button className="btn btn-success" onClick={() => startsell(nft.id)}>List Sell</button>
            )}
          </h5>
		  <h5 class="card-title text-center">
            {nft.forbid || (
              <button className="btn btn-success" onClick={() => startbid(nft.id)}>Bid Your NFT</button>
            )}
          </h5>
		  </div>

		  <div class="d-flex justify-content-around">
        
		  <h5 class="card-title text-center">
            {nft.forbid && (
              <button className="btn btn-success" onClick={()=>selltohighestbidder(nft.id)}>Sell to Highest Bidder</button>
            )}
          </h5>
		  </div>

        </div>
      ))}
    </div>
	</>
  );
}

export default ListOwnedNft