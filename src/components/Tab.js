import Gallery from "../images/main/images-search.png";
import Breeds from "../images/main/pet-breeds.png";
import Vote from "../images/main/vote-table.png";
import { useDispatch } from "react-redux";
import { changePage } from "../store/reducers/pageReducer";

export default function Tab({ children }) {
  const dispatch = useDispatch();
  let url =
    children === "voting" ? Vote : children === "breeds" ? Breeds : Gallery;

  function handlerClick(event) {
    let tab = event.target;
    let parentBox = document.querySelector('.tabs-box');
    let parentBoxBtns = document.querySelector(".nav-panel");
    for (const value of parentBoxBtns.children) {
      if (value.classList.contains("nav-btn-f") && value.localName === "button")
        value.classList.replace("nav-btn-f", "nav-btn");
    }
    for (const value of parentBox.children) {
      if (value !== tab)
        value.className = 'tab';
    }
    tab.parentNode.className = 'tab-f';
  }

  return (
    <div className="tab">
      <div className="tab-icon">
        <img src={url} alt="" />
      </div>
      <button
        className="tab-btn"
        onClick={(event) => { dispatch(changePage(children)); handlerClick(event) }}
      >
        {children}
      </button>
    </div>
  );
}
