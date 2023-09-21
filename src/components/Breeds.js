export default function Breeds() {
  const userId =
    "live_tjRhG76aZqVgTyDzKxFDZl4qGTeFx4IXrOemhE7D6IrsfY75X8QBC6THPXFa0MPe";

  function breeds() {
    fetch(
      "https://api.thecatapi.com/v1/breeds",
      {
        headers: { "x-api-key": userId },
      }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      })
  }
  breeds();
  return (
    <>
      <div>dkfjdfbkd</div>
    </>
  )
}