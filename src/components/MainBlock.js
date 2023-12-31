import { useState } from "react";
import Voting from "./Voting";
import Breeds from "./Breeds";
import Gallery from "./Gallery";
import { TabNavForBreeds } from "./Breeds";
import BreedInfo from "./BreedInfo";

function NavigationPanel() {
  return (
    <div className="nav-panel">
      <div className="inp-box">
        <input
          className="inp-panel"
          type="text"
          placeholder="Search for breeds by name"
        />
        <button className="btn-search"></button>
      </div>
      <button className="nav-btn nb-like"></button>
      <button className="nav-btn nb-fav"></button>
      <button className="nav-btn nb-dislike"></button>
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
        <TabContent page={page} history={arrHistory} onVoteClick={handleUpdateHistory}></TabContent>
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