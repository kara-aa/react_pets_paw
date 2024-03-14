import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVotes,
  selectVotesUp,
  selectVotesDown,
  addVotes,
  addVotesUp,
  addVotesDown,
} from "../store/reducers/votesReducer";

export default function Dislikes() {
  const [arrDislikesAPI, setArrDislikes] = useState();
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [counter, setCounter] = useState(0);
  const scrollArray = [];
  const dispatch = useDispatch();
  const votesStore = useSelector(selectVotes);
  const votesUpStore = useSelector(selectVotesUp);
  const votesDownStore = useSelector(selectVotesDown);

  scrollArray.length = 0;
  scrollArray.push(...votesDownStore.slice(counter * 20, counter * 20 + 20));

  function likes() {
    const arrDislikes = [];
    const arrForStore = [];

    new Promise((resolve, reject) => {
      fetch("https://api.thecatapi.com/v1/votes?limit=70", {
        headers: { "x-api-key": userId },
      }).then((data) => resolve(data.json()));
    })
      .then((result) => {
        if (votesStore.length === 0) {
          result.forEach((item) => arrDislikes.push(item.image));
          result.forEach((item) =>
            arrForStore.push({ image: item.image, value: item.value })
          );
        }
        return result;
      })
      .then((result) => {
        if (votesStore.length === 0) dispatch(addVotes(arrForStore));
        if (votesUpStore.length === 0) dispatch(addVotesUp());
        if (votesDownStore.length === 0) dispatch(addVotesDown());
        setArrDislikes(votesDownStore);
      });
  }

  useEffect(() => likes, []);

  function handlerClickNext() {
    const parentBlock = document.querySelector(".breeds-content");

    if (counter !== Math.ceil(arrDislikesAPI.length / 20) - 1)
      setCounter(counter + 1);
    parentBlock.scrollTop = 0;
  }

  function handlerClickPrev() {
    const parentBlock = document.querySelector(".breeds-content");
    if (counter !== 0) setCounter(counter - 1);
    parentBlock.scrollTop = 0;
  }

  return (
    <>
      <div className="tab-nav">
        <button className="btn-t-back"></button>
        <div className="tab-title">Dislikes</div>
      </div>
      <div className="breeds-content">
        <GridBody gridContent={scrollArray}></GridBody>
        <div className="page-switch">
          <button
            className={counter === 0 ? "sw-prev-dis" : "sw-prev"}
            onClick={handlerClickPrev}
          ></button>
          <button
            className={
              arrDislikesAPI && counter === Math.ceil(arrDislikesAPI.length / 20) - 1
                ? "sw-next-dis"
                : "sw-next"
            }
            onClick={handlerClickNext}
          ></button>
        </div>
      </div>
    </>
  );
}

export function GridBody({ gridContent }) {
  let gridItems;
  if (gridContent) {
    gridItems = gridContent.map((cat, index) => (
      <div
        className={"grid-item gr-i-" + (index > 9 ? index - 10 : index)}
        key={index}
      >
        <img src={cat.image.url} alt="" />
      </div>
    ));
  }

  return <div className="grid-body">{gridItems}</div>;
}
