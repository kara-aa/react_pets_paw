import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../store/reducers/pageReducer";
import { addArray } from "../store/reducers/breedsReducer";
import { addInfoBreed } from "../store/reducers/breedInfoReducer";

export function TabNavForBreeds({
  arrBreeds,
  onChangeHandlerLimit,
  onChangeHandlerBreeds,
  onClickHandlerSort,
}) {
  let breedsList;
  if (arrBreeds) {
    breedsList = arrBreeds.map((info) => (
      <option key={info.id} value={info.id}>
        {info.name}
      </option>
    ));
  }

  function handlerSelectBreed(event) {
    let value = event.target.value;
    if (value === "all") onChangeHandlerBreeds(value);
    else
      onChangeHandlerBreeds(
        "https://api.thecatapi.com/v1/images/search?limit=65&breed_ids=" + value
      );
  }

  function handlerSelect(event) {
    let value = event.target.value;
    onChangeHandlerLimit(parseInt(value));
  }

  function handlerBtnSort(order) {
    onClickHandlerSort(order);
  }

  return (
    <div className="nav-breeds">
      <div className="tab-nav">
        <button className="btn-t-back"></button>
        <div className="tab-title">breeds</div>
      </div>
      <select
        name="breeds"
        id=""
        className="sel-breeds"
        defaultValue="all"
        onChange={handlerSelectBreed}
      >
        <option value="all">All Breeds</option>
        {breedsList}
      </select>
      <select
        name="limit_breeds"
        id="sel_limB"
        className="sel-limitB"
        defaultValue="10"
        onChange={handlerSelect}
      >
        <option value="5">Limit: 5</option>
        <option value="10">Limit: 10</option>
        <option value="15">Limit: 15</option>
        <option value="20">Limit: 20</option>
      </select>
      <button
        className="btn-sort btnS-ZA"
        onClick={() => handlerBtnSort("DESC")}
      ></button>
      <button
        className="btn-sort btnS-AZ"
        onClick={() => handlerBtnSort("ASC")}
      ></button>
    </div>
  );
}

export default function Breeds() {
  const dispatch = useDispatch();
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [arrFromAPI, setAPIArr] = useState();
  const [arrBreeds, setBreeds] = useState();
  const [counter, setCounter] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setOrder] = useState("ASC");
  const scrollArray = [];
  let gridItems;

  if (arrFromAPI) {
    scrollArray.length = 0;
    scrollArray.push(
      ...arrFromAPI.slice(counter * limit, counter * limit + limit)
    );
  }

  function breeds() {
    const arrForBreeds = [];
    let arrAPI = [];

    new Promise((resolve, reject) => {
      fetch("https://api.thecatapi.com/v1/breeds", {
        headers: { "x-api-key": userId },
      }).then((data) => resolve(data.json()));
    })
      .then((result) => {
        result.forEach((item) => {
          if (item.image) arrAPI.push(item);
        });
        return arrAPI;
      })
      .then((result) => {
        setAPIArr(result);
        result.forEach((catInfo) => {
          if (catInfo.id && catInfo.name) {
            arrForBreeds.push({ id: catInfo.id, name: catInfo.name });
            // dispatch(addArray({ id: catInfo.id, name: catInfo.name }));
          }

        });
        setBreeds(arrForBreeds);
        dispatch(addArray(arrForBreeds));
      });
  }

  useEffect(() => breeds, []);

  if (scrollArray) {
    console.log(scrollArray)
    gridItems = scrollArray.map((cat, index) => (
      <div
        className={"grid-item gr-i-" + (index > 9 ? index - 10 : index)}
        key={index}
      >
        <img src={cat.image.url} alt="" />
        <div className="gr-i-hover"></div>
        <button
          className="gr-i-hbtn"
          onClick={() => {dispatch(changePage("breed-info")); dispatch(addInfoBreed(cat))} }
        >
          {cat.name}
        </button>
      </div>
    ));
  }

  function handlerClickNext() {
    if (counter !== Math.ceil(arrFromAPI.length / limit) - 1)
      setCounter(counter + 1);
  }

  function handlerClickPrev() {
    if (counter !== 0) setCounter(counter - 1);
  }

  function onChangeLimit(limit) {
    setLimit(limit);
  }

  function onClickSort(order) {
    if (order !== sortOrder) {
      setCounter(0);
      setOrder(order);
      setAPIArr(arrFromAPI.reverse());
    }
  }

  function onChangeRequest(link) {
    let newArrApi = [];
    setCounter(0);
    setOrder("ASC");
    if (link === "all") breeds();
    else {
      new Promise((resolve, reject) => {
        fetch(link, {
          headers: { "x-api-key": userId },
        }).then((data) => resolve(data.json()));
      })
        .then((result) => {
          result.forEach((item) => {
            let addInfo = { id: item.id, url: item.url };
            item.breeds[0].image = addInfo;
            newArrApi.push(item.breeds[0]);
          });
          return newArrApi;
        })
        .then((result) => {
          setAPIArr(newArrApi);
        });
    }
  }

  return (
    <>
      <TabNavForBreeds
        arrBreeds={arrBreeds}
        onChangeHandlerBreeds={onChangeRequest}
        onChangeHandlerLimit={onChangeLimit}
        onClickHandlerSort={onClickSort}
      ></TabNavForBreeds>
      <div className="breeds-content">
        <div className="grid-body">{gridItems}</div>
        <div className="page-switch">
          <button
            className={counter === 0 ? "sw-prev-dis" : "sw-prev"}
            onClick={handlerClickPrev}
          ></button>
          <button
            className={
              arrFromAPI && counter === Math.ceil(arrFromAPI.length / limit) - 1
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
