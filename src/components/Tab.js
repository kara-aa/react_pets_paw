import Gallery from '../images/main/images-search.png';
import Breeds from "../images/main/pet-breeds.png";
import Vote from "../images/main/vote-table.png";

export default function Tab({ children, handlerClick }) {
  let url = children === 'voting' ? Vote : children === 'breeds' ? Breeds : Gallery;

  return (
    <div className="tab">
      <div className="tab-icon">
        <img src={url} alt="" />
      </div>
      <button className="tab-btn" onClick={handlerClick}>{children}</button>
    </div>
  );
}