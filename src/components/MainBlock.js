import { useState } from "react";
import Voting from "./Voting";
import Breeds from "./Breeds";
import Gallery from "./Gallery";
import BreedInfo from "./BreedInfo";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../store/reducers/pageReducer";
import { changeSearchRequest } from "../store/reducers/searchReducer";
import { selectBreedsArray } from "../store/reducers/breedsReducer";
import Likes from "./Likes";
import Faves from "./Faves";
import Dislikes from "./Dislikes";
import Search from "./Search";

function NavigationPanel() {
  const dispatch = useDispatch();
  const [serchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const breedsArr = useSelector(selectBreedsArray);

  function handlerClickSearchResult(idBreed) {
    dispatch(changePage('search'));
    dispatch(changeSearchRequest(idBreed));

  }

  function handlerSearch(event) {
    console.log('yes')
    const block = document.querySelector(".search-results");
    setSearchTerm(event.target.value);
    const result = breedsArr.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(searchResult)
    setSearchResult(result);
    return result;
  }

  const searchResultList = searchResult.map((item) =>
    (<li key={item.id} onClick={() => handlerClickSearchResult(item.id)}>{item.name}</li>)
  );

  function handlerClickNavBtns(event) {
    let btn = event.target;
    let parentBox = document.querySelector(".nav-panel");
    let parentBoxTabs = document.querySelector(".tabs-box");

    for (const value of parentBoxTabs.children) {
      if (value.className !== 'tab') value.className = "tab";
    }

    for (const value of parentBox.children) {
      if (value !== btn && value.localName === 'button')
        value.classList.replace('nav-btn-f', 'nav-btn')
    }
    btn.classList.replace("nav-btn", "nav-btn-f");
  }

  return (
    <div className="nav-panel">
      <div className="inp-box">
        <input
          className="inp-panel"
          type="text"
          placeholder="Search for breeds by name"
          onChange={(e) => handlerSearch(e)}
        />
        <button className="btn-search"></button>
        <div className="search-results">
          <ul>
            {searchResultList}
          </ul>
        </div>
      </div>
      <button
        className="nav-btn nb-like"
        onClick={(event) => {
          dispatch(changePage("likes"));
          handlerClickNavBtns(event);
        }}
      ></button>
      <button
        className="nav-btn nb-fav"
        onClick={(event) => {
          dispatch(changePage("faves"));
          handlerClickNavBtns(event);
        }}
      ></button>
      <button
        className="nav-btn nb-dislike"
        onClick={(event) => {
          dispatch(changePage("dislikes"));
          handlerClickNavBtns(event);
        }}
      ></button>
    </div>
  );
}



function TabContent({ history, onVoteClick, page }) {
  return (
    <div className="tab-content">
      {page === "voting" && (
        <Voting history={history} onVoteClick={onVoteClick}></Voting>
      )}
      {page === "breeds" && <Breeds></Breeds>}
      {page === "gallery" && <Gallery></Gallery>}
      {page === "breed-info" && <BreedInfo></BreedInfo>}
      {page === "likes" && <Likes></Likes>}
      {page === "faves" && <Faves></Faves>}
      {page === "dislikes" && <Dislikes></Dislikes>}
      {page === "search" && <Search></Search>}
    </div>
  );
}

export default function MainBlock({page}) {
  const [arrHistory, setHistory] = useState([]);

  function handleUpdateHistory(newAction) {
    newAction.time = time();

    const newHistory = arrHistory.slice();
    newHistory.unshift(newAction);
    setHistory(newHistory);
  }

  return (
    <>
      <NavigationPanel></NavigationPanel>
        <TabContent
          page={page}
          history={arrHistory}
          onVoteClick={handleUpdateHistory}
        ></TabContent>
    </>
  );
}

function time() {
  let now = new Date();
  let hours = "" + now.getHours();
  let minutes = "" + now.getMinutes();

  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = 0 + minutes;

  let time = hours + ":" + minutes;
  return time;
}