import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFaves, addFaves } from "../store/reducers/favesReducer";

export default function Faves() {
  const [arrFavesAPI, setArrFaves] = useState();
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [counter, setCounter] = useState(0);
  const scrollArray = [];
  const dispatch = useDispatch();
  const favesStore = useSelector(selectFaves);

  scrollArray.length = 0;
  scrollArray.push(...favesStore.slice(counter * 20, counter * 20 + 20));

  function faves() {
    const arrFaves = [];
    const arrForStore = [];

    new Promise((resolve, reject) => {
      fetch("https://api.thecatapi.com/v1/favourites", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-api-key": userId,
        },
      }).then((data) => resolve(data.json()))
    })
      .then((result) => {
        if (favesStore.length === 0) {
          result.forEach((item) => arrFaves.push(item.image));
          result.forEach((item) => arrForStore.push(item.image));
        }
        return result;
       })
      .then((result) => {
        if (favesStore.length === 0) dispatch(addFaves(arrForStore));
        setArrFaves(arrFaves);
      });

  }

  useEffect(() => faves, []);

  function handlerClickNext() {
    const parentBlock = document.querySelector(".breeds-content");

    if (counter !== Math.ceil(arrFavesAPI.length / 20) - 1)
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
        <div className="tab-title">Favourites</div>
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
              arrFavesAPI && counter === Math.ceil(arrFavesAPI.length / 20) - 1
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
        <img src={cat.url} alt="" />
      </div>
    ));
  }

  return <div className="grid-body">{gridItems}</div>;
}
