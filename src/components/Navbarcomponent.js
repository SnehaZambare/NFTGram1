import React,{useState} from 'react';
import Loader from './Loader';
import { ethers } from 'ethers';
import Logincomponent from './Logincomponent';
import AlertComponent from './AlertComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
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
function Navbarcomponent(props) {

  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');

  async function create(imageUrlv,pricev,namev) {
		try {
		  const { ethereum } = window;
		  if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();

			const NFTContract = new ethers.Contract(NFTContractAddress,abiNFTContract,signer);
			let txn = await NFTContract.addNFT(imageUrlv,pricev,namev);
			//console.log(txn)

		  }
		} catch (error) {
		  console.error(error);
		}
	  }




  const divStyle = {
    borderBottom: '0.1px solid white',
  };


  return (
    <>
  <Loader></Loader>
  <div className='sticky-top'>
  {props.currentAccount ? 
        <div className='container-fluid text-center d-flex justify-content-end bgd' style={divStyle}>
        <div>
        {props.currentAccount ? 

            <button type="button" className="btn btn-success mr-3" data-toggle="modal" data-target="#exampleModal">
              Profile,
              <span className="badge badge-light">{" "}{props.currentAccount}</span>
            </button>
          : ""
          }
        </div>

     
      </div>:""}

      <nav className="navbar navbar-expand-lg navbar-dark bgd">
      
        <div className="logo-holder logo-3 mr-3">
          <a>
            <h3>CBSB</h3>
            <p>NFT Marketplace</p>
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse mr-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
        

            <AlertComponent></AlertComponent>
          </ul>
          {props.currentAccount?<button  className='btn btn-primary mr-2' data-toggle="modal" data-target="#exampleModal1" >Create NFT</button>:""}
          {props.currentAccount?<Link to="/ownednfts" className='btn btn-primary mr-2' >Owned NFTs</Link>:""}
          {props.currentAccount?<Link to="/" className='btn btn-secondary'>Home</Link>:""}
           
            <Logincomponent setCurrentAccount={props.setCurrentAccount} setCurrentBalanace={props.setCurrentBalanace} currentAccount={props.currentAccount} currentBalance={props.currentBalance} ></Logincomponent>
        </div>
      </nav>
    </div>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Profile</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text text-success" id="basic-addon1">User Address</span>
            </div>
            <input type="text" className="form-control" disabled value={props.currentAccount} aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text text-success" id="basic-addon1">Eth Balance</span>
            </div>
            <input type="text" className="form-control " disabled value={props.currentBalance}   aria-describedby="basic-addon1"/>
          </div>


          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create NFT</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control" id="name"/>
          </div>
          <div class="form-group">
            <label for="name" class="col-form-label">Image Path/Select Image:</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} class="form-control" id="image"/>
          </div>
          <div class="form-group">
            <label for="name" class="col-form-label">Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  class="form-control" id="price"/>
          </div>
     
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>create(imageUrl,price,name)}>Create</button>
      </div>
    </div>
  </div>
</div>


  
    </>
  );
}

export default Navbarcomponent