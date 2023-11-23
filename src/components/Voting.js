import { useLayoutEffect, useState } from "react";
import LikeIcon20 from '../images/icons/like-color-20.png'
import DisikeIcon20 from '../images/icons/dislike-color-20.png'
import FavIcon20 from '../images/icons/fav-20.png'

export default function Voting({history, onVoteClick}) {
  const userId = "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";
  const [imgId, setImgId] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchDataFromAPI() {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
        {
          headers: { "x-api-key": userId },
        }
      );
      const data = await response.json();
      setImgId(data[0].id);
      setImgUrl(data[0].url);
      console.log(data)

    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    setLoading(false);
  }

  useLayoutEffect(() => {
    fetchDataFromAPI();
  }, [])

  function handlerHistoryOnClick(value) {
    let list = value === 1 ? "Likes" : value === -1 ? "Dislikes" : "Favourites";

    const body = {
      imageId: imgId,
      action: 'added',
      list: list,
    };

    onVoteClick(body);
  }

  function handlerVote(value) {
    handlerHistoryOnClick(value);
    let url = "https://api.thecatapi.com/v1/votes";
    const body = {
      image_id: imgId,
      sub_id: "user-123",
      value: value,
    };

    if (value === 'fav') {
      url = "https://api.thecatapi.com/v1/favourites";
      delete body.value;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": userId },
      body: JSON.stringify(body),
    });

    setLoading(true);
    fetchDataFromAPI();
  }

  return (
    <>
      <div className="tab-nav">
        <button className="btn-t-back"></button>
        <div className="tab-title">breeds</div>
      </div>
      {loading && <Loader></Loader>}
      {!loading && (
        <div
          className="cat-image"
          style={{ background: `url(${imgUrl}) center / cover no-repeat` }}
        ></div>
      )}
      <div className="box-rating">
        <button className="btn-rate" onClick={() => handlerVote(1)}></button>
        <button
          className="btn-rate"
          onClick={() => handlerVote("fav")}
        ></button>
        <button className="btn-rate" onClick={() => handlerVote(-1)}></button>
      </div>
      <History imageId={imgId} history={history}></History>
    </>
  );
}

function History({ history }) {

  let historyActions = history.map((action, index) => {
    const { imageId: imgId, action: move, list, time } = action;
    return (
      <li key={index}>
        <HistoryAction imageId={imgId} action={move} list={list} time={time}></HistoryAction>
      </li>);
  })

  return (
    <>
      <div className="history-list">
          <ul>{historyActions}</ul>
      </div>
    </>
  );
}

function HistoryAction({ imageId, action, list, time }) {
  let iconUrl = list === 'Likes' ? LikeIcon20 : list === "Dislikes" ? DisikeIcon20 : FavIcon20;
  return (
    <>
      <div className="act-box">
        <div className="act-time">{time}</div>
        <div className="act-description">
          ImageID: <span>{imageId}</span> was {action} to {list}
        </div>
        <div
          className="act-icon"
          style={{ background: `url(${iconUrl}) center / cover no-repeat` }}
        ></div>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="loader"></div>
  )
}
