import React from 'react';
import Loader from './Loader';
import Logincomponent from './Logincomponent';
import AlertComponent from './AlertComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function Navbarcomponent(props) {


  const handleGoBack = () => {
    window.history.back();
    
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
          {props.currentAccount?<Link to="/ownednfts" className='btn btn-primary mr-2' >Owned NFTs</Link>:""}
          {props.currentAccount?<button className='btn btn-secondary' onClick={handleGoBack}>Go Back</button>:""}
           
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


  
    </>
  );
}

export default Navbarcomponent