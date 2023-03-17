import React,{useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Navbarcomponent from './components/Navbarcomponent';
import FooterComponent from './components/FooterComponent';
import ForceLogin from './components/ForceLogin';
import AdminPanel from './components/AdminPanel';
import Loader from './components/Loader';
import Home from './components/Home';
import ListOwnedNft from './components/ListAllOwnersNft';

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalanace] = useState("");
  return <>
    <div className="App">
        <Loader></Loader>
          {currentAccount?
          <Router>
              <Navbarcomponent setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbarcomponent>
              <>
                <Routes> 
                  <Route exact path='/admin' element={<AdminPanel></AdminPanel>}></Route> 
                  <Route exact path='/' element={<Home currentAccount={currentAccount}></Home>}></Route>
                  <Route exact path='/ownednfts' element={<ListOwnedNft currentAccount={currentAccount}></ListOwnedNft>}></Route>
                </Routes>
              </>
                <FooterComponent></FooterComponent>
          </Router>
          :
          <Router>
              <Navbarcomponent setCurrentAccount={setCurrentAccount} setCurrentBalanace={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></Navbarcomponent>
              <>
                <Routes> 
                  <Route exact path='/' element={<ForceLogin></ForceLogin>}></Route>
                  <Route exact path='*' element={<ForceLogin></ForceLogin>}></Route>
                </Routes>
              </>
                <FooterComponent></FooterComponent>
          </Router> 
        }
        </div>
  </>;
}

export default App;
