import './App.css';
import logo from './images/main/Group 20.png'
import Tab from './components/Tab';
import MainPage from './components/MainPage';
import MainBlock from './components/MainBlock';
import { useState } from 'react';




function App() {
  const [page, setPage] = useState('main');

  return (
    <div className="wrapper">
      <div className="navigation">
        <div className="logo">
          <img src={logo} alt="" />
          PetsPaw
        </div>
        <div className="nav-content">
          <h1>Hi intern!</h1>
          <div className="subtitle">Welcome to MI 2022 Front-end test</div>
          <h4 className="tabs-title">Lets start using The Cat API</h4>
          <div className="tabs-box">
            <Tab
              handlerClick={() => {
                setPage("voting");
              }}
            >
              voting
            </Tab>
            <Tab
              handlerClick={() => {
                setPage("breeds");
              }}
            >
              breeds
            </Tab>
            <Tab
              handlerClick={() => {
                setPage("gallery");
              }}
            >
              gallery
            </Tab>
          </div>
        </div>
      </div>
      <div className="main-page">
        {page === "main" && <MainPage></MainPage>}
        {page !== "main" && <MainBlock page={page}></MainBlock>}
      </div>
    </div>
  );
}

export default App;
