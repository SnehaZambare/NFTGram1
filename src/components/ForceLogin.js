import {React,useState,useEffect} from 'react'
import Loader from './Loader'
import '../Typewriter.css';

function ForceLogin() {

  const [text, setText] = useState("");
  // const messages = ["NFT Marketplace","Create , Buy , sell , Bid","Your NFTs"];

  // useEffect(() => {
  //   let i = 0;
  //   let timer = setInterval(() => {
  //     setText(messages[i]);
  //     i = (i + 1) % messages.length;
  //   }, 2000);
  //   return () => clearInterval(timer);
  // }, []);


  return (
  <>
  <Loader></Loader>
    <div className="home-page">
      <img 
      className='bg-img'
      src={process.env.PUBLIC_URL + "/bg2.png"} 
      alt="Background" 
      style={{ 
          width: '100%', 
          //height: '75rem', 
          objectFit: 'cover' 
        }} 
      />
       <div className="typewriter-text my-div">
        {text}
      </div>
    </div>
        
  </>
  )
}

export default ForceLogin