// 読み込み中マーク描画
const renderLoader = () => {
  const loader = document.createElement("div");
  loader.id = "loader";
  const parentDiv = document.getElementById("selectors");
  parentDiv.appendChild(loader);
};

const removeLoader = () => {
  const loader = document.getElementById("loader");
  const parentDiv = document.getElementById("selectors");
  parentDiv.removeChild(loader);
};

const fetchWines = async (kind) => {
  renderLoader();
  const wines = await fetch(`https://api.sampleapis.com/wines/${kind}`);
  const data = await wines.json();
  renderWineList(data);
  removeLoader();
};

// 各ワインリスト描画
const renderWineList = (eachData) => {
  const currentLists = document.getElementById("wineLists");
  const newLists = document.createElement("div");
  newLists.id = "wineLists";
  const parentDiv = currentLists.parentNode;
  parentDiv.replaceChild(newLists, currentLists); //既存リスト置換

  for (let i = 0; i < eachData.length; i++) {
    const eachWine = document.createElement("div");
    const wineName = document.createElement("h4");
    const winery = document.createElement("li");
    const location = document.createElement("li");
    const rateStars = document.createElement("li");
    const reviews = document.createElement("li");
    const image = document.createElement("img");

    // 5段階評価星
    let rating = Math.floor(eachData[i].rating.average);
    if (rating === 1) {
      ratingAverage = "★";
    } else if (rating === 2) {
      ratingAverage = "★★";
    } else if (rating === 3) {
      ratingAverage = "★★★";
    } else if (rating === 4) {
      ratingAverage = "★★★★";
    } else {
      ratingAverage = "★★★★★";
    }

    eachWine.id = "eachWine";
    wineName.textContent = eachData[i].wine;
    winery.textContent = "ワイナリー : " + eachData[i].winery;
    location.textContent = "生産地 : " + eachData[i].location;
    rateStars.textContent = ratingAverage;
    reviews.textContent = eachData[i].rating.reviews;
    image.src = eachData[i].image;
    image.alt = "No Wine Image";

    eachWine.appendChild(image);
    eachWine.appendChild(wineName);
    eachWine.appendChild(winery);
    eachWine.appendChild(location);
    eachWine.appendChild(rateStars);
    eachWine.appendChild(reviews);
    newLists.appendChild(eachWine);
  }
};

// デフォルトで赤ワインリスト呼び出し;
window.onload = fetchWines("reds");
