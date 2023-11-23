import { useSelector } from "react-redux";
import { selectBreedInfo } from "../store/reducers/breedInfoReducer";

export function TabNavForBreeds({}) {
  return (
    <div className="nav-breeds">
      <div className="tab-nav">
        <button className="btn-t-back"></button>
        <div className="tab-title">breeds</div>
      </div>
    </div>
  );
}

export default function BreedInfo() {
  const breedInfoObj = useSelector(selectBreedInfo);
  console.log(breedInfoObj.description.length);

  return (
    <>
      <TabNavForBreeds></TabNavForBreeds>
      <div className="breeds-cont-info">
        <div
          className="brI-cat-img"
          style={{
            background: `url(${breedInfoObj.image.url}) center / cover no-repeat`,
          }}
        ></div>
        <div className="brI-text-box">
          <div className="brI-name">{breedInfoObj.name}</div>
          <div className="brI-grid-box">
            <div className="brI-gr-i gr-i-1">
              {breedInfoObj.description}
              <div className="brI-full-desc">{breedInfoObj.description}</div>
            </div>
            {breedInfoObj.description.length > 220
              ? console.log("yes")
              : console.log("no")}
            <div className="brI-gr-i gr-i-2">
              <span>Temperament: </span>
              {breedInfoObj.temperament}
            </div>
            <div className="brI-gr-i gr-i-3">
              <p>
                <span>Origin: </span>
                {breedInfoObj.origin}
              </p>
              <p>
                <span>Weight: </span>
                {breedInfoObj.weight.imperial} kgs
              </p>
              <p>
                <span>Life span: </span>
                {breedInfoObj.life_span} years
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
