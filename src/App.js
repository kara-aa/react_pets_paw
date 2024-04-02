import "./App.css";
import logo from "./images/main/Group 20.png";
import Tab from "./components/Tab";
import MainPage from "./components/MainPage";
import MainBlock from "./components/MainBlock";
import { useSelector } from "react-redux";
import { selectPage } from "./store/reducers/pageReducer";
import Breeds from "./mandatoryData/breedsList";

function App() {
  const pageStore = useSelector(selectPage);
  Breeds();

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
            <Tab>voting</Tab>
            <Tab>breeds</Tab>
            <Tab>gallery</Tab>
          </div>
        </div>
      </div>
      <div className="main-page">
        <MainBlock page={pageStore}></MainBlock>
      </div>
    </div>
  );
}

export default App;
