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
import ListAllNft from './ListAllNFTs';

function Home(props) {

  return (
    <>
    <Loader></Loader>
    <OurService p={"Create, Buy, Sell, BId, NFT Platform"}></OurService>
    <ListAllNft></ListAllNft>
    </>
  );
}

export default Home
