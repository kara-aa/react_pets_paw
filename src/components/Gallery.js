import { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBreedsArray } from "../store/reducers/breedsReducer";
import { addHistory, clearHistory, selectHistoryGallery } from "../store/reducers/historyGalleryReducer";
import React from "react";

export function TabNavForGallery({
  onChangeHandlerType,
  onChangeHandlerLimit,
  onChangeHandlerBreeds,
  onChangeHandlerSort,
}) {
  let breedsList;
  const breedsListFromStore = [].concat(useSelector(selectBreedsArray));

  breedsList = breedsListFromStore.map((info) => (
    <option key={info.id} value={info.id}>
      {info.name}
    </option>
  ));

  function handlerSelectType(event) {
    let value = event.target.value;
    onChangeHandlerType(value, 'mime_types');
  }

  function handlerSelectBreed(event) {
    let value = event.target.value;
    onChangeHandlerBreeds(value, 'breed_ids')
  }

  function handlerSelect(event) {           //Function for data transfer about limit data
    let value = event.target.value;
    onChangeHandlerLimit(value, "limit");
  }

  function handlerSelectSort(event) {       //Function for data transfer about sort changes
    let value = event.target.value;
    onChangeHandlerSort(value, 'order');
  }

  return (
    <div className="nav-gallery">
      <div className="nav-gallery-title">
        <div className="tab-nav-gallery">
          <button className="btn-t-back"></button>
          <div className="tab-title">gallery</div>
        </div>
        <button className="btn-g-upload">
          <p>UPLOAD</p>
        </button>
      </div>

      <div className="fillter-gallery">
        <div>
          <label htmlFor="sel_g_order">Order</label>
          <select
            name="g_order"
            id="sel_g_order"
            className="sel-g-order"
            defaultValue="RAND"
            onChange={handlerSelectSort}
          >
            <option value="RAND">Random</option>
            <option value="ASC">Asc</option>
            <option value="DESC">Desc</option>
          </select>
        </div>

        <div>
          <label htmlFor="sel_g_type">Type</label>
          <select
            name="g_type"
            id="sel_g_type"
            className="sel-g-type"
            defaultValue="static"
            onChange={handlerSelectType}
          >
            <option value="gif,jpg">All</option>
            <option value="jpg">Static</option>
            <option value="gif">Animated</option>
          </select>
        </div>

        <div>
          <label htmlFor="sel_g_breeds">Breed</label>
          <select
            name="breeds"
            id="sel_g_breeds"
            className="sel-breeds"
            defaultValue="all"
            onChange={handlerSelectBreed}
          >
            <option value="all">All Breeds</option>
            {breedsList}
          </select>
        </div>

        <div>
          <label htmlFor="sel_limG">Limit</label>
          <select
            name="limit_g_breeds"
            id="sel_limG"
            className="sel-limitG"
            defaultValue="10"
            onChange={handlerSelect}
          >
            <option value="5">5 items per page</option>
            <option value="10">10 items per page</option>
            <option value="15">15 items per page</option>
            <option value="20">20 items per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [arrFromAPI, setAPIArr] = useState(); //Array from API with all information
  const [counter, setCounter] = useState(0); //Counter page
  const [arrFaves, setArrFaves] = useState(); //Array of user favourites
  const [link, setLink] = useState(
    `https://api.thecatapi.com/v1/images/search?limit=10`
  );
  const historyGallery = useSelector(selectHistoryGallery);
  console.log(historyGallery)
  const dispatch = useDispatch();

  function breeds(link) {
    let arrAPI = [];
    if (counter >= historyGallery.length) {
      new Promise((resolve, reject) => {
        fetch(link, {
          headers: { "x-api-key": userId },
        }).then((data) => resolve(data.json()));
      }).then((result) => {
        const arrFaves = [];
        new Promise((resolveFaves, reject) => {
          fetch("https://api.thecatapi.com/v1/favourites", {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "x-api-key": userId,
            },
          }).then((data) => resolveFaves(data.json()));
        })
          .then((resultFaves) => {
            result.forEach((item) => {
              item.isFav = resultFaves.some(
                (itemFav) => itemFav.image.id === item.id
              );
              arrAPI.push(item);
            });
            resultFaves.forEach((itemFav) => {
              arrFaves.push({ imageId: itemFav.image.id, favId: itemFav.id });
            });
            return arrAPI;
          })
          .then((result) => {
            setAPIArr(result);
            setArrFaves(arrFaves);
            dispatch(addHistory([result]));
          });
      });
    }
  }
  useEffect(() => breeds(link, counter), [link, counter]);

  function handlerClickGalleryFav(event) {
    //Function for adding fav cat by click on item
    let idFav = event.target.id;
    let bodyFav = JSON.stringify({
      image_id: idFav,
      sub_id: "user-123",
    });

    let newData = arrFromAPI.slice();
    console.log(newData);

    for (const value of newData) {
      if (value.id === idFav) {
        if (value.isFav) {
          const itemFav = arrFaves.find((item) => item.imageId === idFav);
          fetch(`https://api.thecatapi.com/v1/favourites/${itemFav.favId}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              "x-api-key": userId,
            },
          });
        } else {
          fetch("https://api.thecatapi.com/v1/favourites", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-api-key": userId,
            },
            body: bodyFav,
          });
        }
        value.isFav = !value.isFav;
      }
    }
    setAPIArr(newData);
  }

  function handlerClickNext(event) {
    //Function for click on next button
    const parentBlock = document.querySelector(".gallery-content");
    setCounter(counter + 1);
    parentBlock.scrollTop = 0;
  }

  function handlerClickPrev() {
    const parentBlock = document.querySelector(".gallery-content");
    if (counter !== 0) setCounter(counter - 1);
    parentBlock.scrollTop = 0;
  }

  function onChangeRequest(value, param) {            //Function for changing request by filters(limit, breeds, etc)
    let newLink;
    setCounter(0);
    dispatch(clearHistory());

    if (link.includes(param) && param + value === "breed_idsall") {
      let regex = new RegExp(`(\\?|&)${param}=([^&]*)`);
      newLink = link.replace(regex, '');
      setLink(newLink);
    } else if (link.includes(param)) {
      if (!link.includes(param + value)) {
        let regex = new RegExp(`(\\?|&)${param}=([^&]*)`);
        newLink = link.replace(regex, `$1${param}=${value}`);
        setLink(newLink);
      }
    } else {
      newLink = link + `&${param}=${value}`;
      setLink(newLink);
    }
  }

  return (
    <>
      <TabNavForGallery
        onChangeHandlerType={onChangeRequest}
        onChangeHandlerBreeds={onChangeRequest}
        onChangeHandlerLimit={onChangeRequest}
        onChangeHandlerSort={onChangeRequest}
      ></TabNavForGallery>
      <div className="gallery-content">
        <GridBody
          gridContent={historyGallery[counter]}
          handlerFav={handlerClickGalleryFav}
        ></GridBody>
        <div className="page-switch">
          <button
            className={counter === 0 ? "sw-prev-dis" : "sw-prev"}
            onClick={handlerClickPrev}
          ></button>
          <button
            className="sw-next"
            onClick={handlerClickNext}
          ></button>
        </div>
      </div>
    </>
  );
}

export function GridBody({ gridContent, handlerFav }) {
  let gridItems;
  console.log(gridContent)
  if (gridContent) {
    gridItems = gridContent.map((cat, index) => (
      <div
        className={"grid-item gr-i-" + (index > 9 ? index - 10 : index)}
        key={index}
      >
        <img src={cat.url} alt="" />
        <div className="gr-i-hover"></div>
        <button
          className={
            !cat.isFav ? "gr-i-hbtn gr-i-hgbtn" : "gr-i-hbtn gr-i-hgbtn-f"
          }
          id={cat.id}
          onClick={handlerFav}
        ></button>
      </div>
    ));
  // } else if(gridContent[0].length === 0){
  //   gridItems = <div className="g-con-empty">None</div>
    // }
    console.log(gridContent)
  return (
    <div className="grid-body">
      {gridItems}
    </div>
  )
}