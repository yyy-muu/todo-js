const redsBtn = document.getElementById("reds");
const whitesBtn = document.getElementById("whites");
const sparklingBtn = document.getElementById("sparkling");
const dessertBtn = document.getElementById("dessert");
const portBtn = document.getElementById("port");

// let eachData = {};

const redsURL = "https://api.sampleapis.com/wines/reds";
const whitesURL = "https://api.sampleapis.com/wines/whites";
const sparklingURL = "https://api.sampleapis.com/wines/sparkling";
const dessertURL = "https://api.sampleapis.com/wines/dessert";
const portURL = "https://api.sampleapis.com/wines/port";

// onload = () => {
//   document.getElementById("reds").click();
// };

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

const fetchReds = async () => {
  renderLoader();
  const resReds = await fetch(redsURL);
  let redsData = await resReds.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderWineList(redsData);
  removeLoader();
};

const fetchWhites = async () => {
  renderLoader();
  const resWhites = await fetch(whitesURL);
  let whitesData = await resWhites.json();
  renderWineList(whitesData);
  removeLoader();
};

// const fetchSparkling = async () => {
//   renderLoader();
//   const resSparkling = await fetch(sparklingURL);
//   let sparklingData = await resSparkling.json();
//   renderWineList(sparklingData);
//   removeLoader();
// };

// const fetchDessert = async () => {
//   renderLoader();
//   const resDessert = await fetch(dessertURL);
//   let dessertData = await resDessert.json();
//   renderWineList(dessertData);
//   removeLoader();
// };

// const fetchPort = async () => {
//   renderLoader();
//   const resPort = await fetch(portURL);
//   let portData = await resPort.json();
//   renderWineList(portData);
//   removeLoader();
// };

// 赤ワインリスト作成
const renderWineList = (eachData) => {
  const currentList = document.getElementById("wineLists");
  console.log(currentList);

  currentList(currentList);

  let wineLists = document.createElement("div");

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

    eachWine.appendChild(image);
    eachWine.appendChild(wineName);
    eachWine.appendChild(winery);
    eachWine.appendChild(location);
    eachWine.appendChild(rateStars);
    eachWine.appendChild(reviews);

    wineLists.appendChild(eachWine);
  }
};

// 各ワインリスト呼び出し
redsBtn.addEventListener("click", fetchReds);
whitesBtn.addEventListener("click", fetchWhites);
// sparklingBtn.addEventListener("click", fetchSparkling);
// dessertBtn.addEventListener("click", fetchDessert);
// portBtn.addEventListener("click", fetchPort);
