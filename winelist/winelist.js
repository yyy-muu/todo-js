const redsBtn = document.getElementById("reds");
const whitesBtn = document.getElementById("whites");
const sparklingBtn = document.getElementById("sparkling");
const dessertBtn = document.getElementById("dessert");
const portBtn = document.getElementById("port");

// 読み込み中マーク描画
const renderLoader = () => {
  const loader = document.createElement("div");
  loader.id = "loader";
  document.body.appendChild(loader);
};

const removeLoader = () => {
  const loader = document.getElementById("loader");
  document.body.removeChild(loader);
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

const getWineLists = () => {
  const redsBtnState = document.getElementById("reds");
  const whitesBtnState = document.getElementById("whites");
  const sparklingBtnState = document.getElementById("sparkling");
  const dessertBtnState = document.getElementById("dessert");
  const portBtnState = document.getElementById("port");

  if (redsBtnState.checked) {
    fetchWines(redsBtnState.id);
  } else if (whitesBtnState.checked) {
    fetchWines(whitesBtnState.id);
  } else if (sparklingBtnState.checked) {
    fetchWines(sparklingBtnState.id);
  } else if (dessertBtnState.checked) {
    fetchWines(dessertBtnState.id);
  } else {
    fetchWines(portBtnState.id);
  }
};

// 各ワインリスト呼び出し
redsBtn.addEventListener("click", getWineLists);
whitesBtn.addEventListener("click", getWineLists);
sparklingBtn.addEventListener("click", getWineLists);
dessertBtn.addEventListener("click", getWineLists);
portBtn.addEventListener("click", getWineLists);

// デフォルトで赤ワインリスト呼び出し
window.onload = getWineLists;
