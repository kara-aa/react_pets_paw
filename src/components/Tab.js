import Gallery from "../images/main/images-search.png";
import Breeds from "../images/main/pet-breeds.png";
import Vote from "../images/main/vote-table.png";
import { useDispatch } from "react-redux";
import { changePage } from "../store/reducers/pageReducer";

export default function Tab({ children }) {
  const dispatch = useDispatch();
  let url =
    children === "voting" ? Vote : children === "breeds" ? Breeds : Gallery;

  return (
    <div className="tab">
      <div className="tab-icon">
        <img src={url} alt="" />
      </div>
      <button
        className="tab-btn"
        onClick={() => dispatch(changePage(children))}
      >
        {children}
      </button>
    </div>
  );
}
