import { useEffect, useState } from "react";
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
  const breedsArr = useSelector(selectBreedsArray);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => foo , [breedsArr]);
  function foo() {
    setSearchResult(breedsArr);
  }
  function handlerClickSearchResult(idBreed) {
    dispatch(changePage('search'));
    dispatch(changeSearchRequest(idBreed));
  }

  function handlerSearch(event) {
    const result = breedsArr.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setSearchResult(result);
  }

  const searchResultList = searchResult.map((item) => (
    <li key={item.id} onClick={() => handlerClickSearchResult(item.id)}>
      {item.name}
    </li>
  ));

  function handlerFocusInput() {
    const searchInput = document.querySelector('.inp-box');
    const resultList = document.querySelector(".search-results");
    searchInput.classList.add('inp-box-f');
    resultList.style.visibility = 'visible';
  }

  function handlerBlurInput(e) {
    const searchInput = document.querySelector(".inp-box");
    setTimeout(function () {
      const resultList = document.querySelector(".search-results");
      resultList.style.visibility = "hidden";
      e.target.textContent = '';
    }, 1000);
    searchInput.classList.remove("inp-box-f");

  }

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
          onFocus={handlerFocusInput}
          onBlur={(e) => handlerBlurInput(e)}
        />
        <button className="btn-search"></button>
        <div className="search-results">
          <ul>{searchResultList}</ul>
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