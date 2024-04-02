import { useDispatch } from "react-redux";
import { addArray } from "../store/reducers/breedsReducer";

export default function Breeds() {
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const dispatch = useDispatch();
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
      // setAPIArr(result);
      result.forEach((catInfo) => {
        if (catInfo.id && catInfo.name) {
          arrForBreeds.push({ id: catInfo.id, name: catInfo.name });
        }
      });
      // setBreeds(arrForBreeds);
      dispatch(addArray(arrForBreeds));
    });
}