import { useEffect, useState } from "react";

export function TabNavForGallery({
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
    <div className="nav-gallery">
      <div className="nav-gallery-title">
        <div className="tab-nav-gallery">
          <button className="btn-t-back"></button>
          <div className="tab-title">gallery</div>
        </div>
        <button className="btn-g-upload"><p>UPLOAD</p></button>
      </div>

      <div className="fillter-gallery">
        <div>
          <label for="sel_g_order">Order</label>
          <select
            name="g_order"
            id="sel_g_order"
            className="sel-g-order"
            defaultValue="random"
          >
            <option value="random">Random</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div>
          <label for="sel_g_type">Type</label>
          <select
            name="g_type"
            id="sel_g_type"
            className="sel-g-type"
            defaultValue="static"
          >
            <option value="all">All</option>
            <option value="static">Static</option>
            <option value="animated">Animated</option>
          </select>
        </div>

        <div>
          <label for="sel_g_breeds">Breed</label>
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
          <label for="sel_limG">Limit</label>
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
          if (catInfo.id && catInfo.name)
            arrForBreeds.push({ id: catInfo.id, name: catInfo.name });
          setBreeds(arrForBreeds);
        });
      });
  }

  useEffect(() => {
    breeds();
  }, []);

  if (scrollArray) {
    gridItems = scrollArray.map((cat, index) => (
      <div
        className={"grid-item gr-i-" + (index > 9 ? index - 10 : index)}
        key={index}
      >
        <img src={cat.image.url} alt="" />
        <div className="gr-i-hover"></div>
        <button className="gr-i-hbtn gr-i-hgbtn"></button>
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
      <TabNavForGallery
        arrBreeds={arrBreeds}
        onChangeHandlerBreeds={onChangeRequest}
        onChangeHandlerLimit={onChangeLimit}
        onClickHandlerSort={onClickSort}
      ></TabNavForGallery>
      <div className="gallery-content">
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
