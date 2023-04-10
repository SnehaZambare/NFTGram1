import React from 'react'
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import Loader from './Loader';

const NFTContractAddress="0x241c42d4D9c0A55e9CB57d2E1Ce55FCE0bB6D981";
const abiNFTContract=[
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
	},
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
		"inputs": [],
		"name": "listNFTs",
		"outputs": [
			{
				"components": [
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
	}
];

var arraylist=[];
var whole=[];

function AdminPanel() {

	const [w1,setw1] = useState([]);

    async function getAllNFTs() {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			arraylist = await NFTContract.listNFTs();
			console.log(arraylist)
			for(var i=0;i<arraylist.length;i++){
				whole[i]=arraylist[i];
			}
			setw1(whole);
			//console.log(whole)
		  }
		} catch (error) {
		  alert(error);
		}
	  }

      useEffect(() => {
		getAllNFTs();
	  }, [])

  return (
    <>
	<Loader></Loader>
    <div className="container-fluid shadow-lg p-3 mb-5 bg-white rounded mt-3">
      {w1.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered">
            <thead className="thead-dark">
            <tr>
              <th>NFT</th>
              <th>NFT Name</th>
              <th>NFT Price</th>
              <th>NFT Owner</th>
              <th>NFT For Sale</th>
              <th>NFT ForBid</th>
              <th>NFT Highest Bid</th>
              <th>NFT Highest Bidder</th>
            </tr>
          </thead>
          <tbody>
            {w1.map((record, index) => (
              <tr key={index}>
			  	<td> <img 
      className='bg-img'
      src={String(record[0])}
      alt="Background" 
      style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }} 
      /></td>
                <td>{String(record[3])}</td>
                <td>{String(record[1])}</td>
                <td>{String(record[2])}</td>
                <td>{String(record[4])}</td>
                <td>{String(record[5])}</td>
                <td>{String(record[6])}</td>
                <td>{String(record[7])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
    </>
  )
}

export default AdminPanel