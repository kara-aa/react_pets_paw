import { useEffect, useState } from "react";
import { selectSearchRequest } from "../store/reducers/searchReducer";
import { useSelector } from "react-redux";

export default function Search() {
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [APIArr, setAPIArr] = useState([]);
  const searchBreed = useSelector(selectSearchRequest);

  useEffect(() => {
    function searchRequest() {
      let newArrApi = [];
      new Promise((resolve, reject) => {
        fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${searchBreed}&limit=20`,
          {
            headers: { "x-api-key": userId },
          }
        ).then((data) => resolve(data.json()));
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
          console.log(result);
          setAPIArr(newArrApi);
        });
    }
    searchRequest();
  }, [searchBreed]);

  return (
    <>
      <div className="tab-nav">
        <button className="btn-t-back"></button>
        <div className="tab-title">search</div>
      </div>
      <div className="breeds-content">
        <GridBody gridContent={APIArr}></GridBody>
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
