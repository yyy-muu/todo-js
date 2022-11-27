const wineLists = document.getElementById("wineLists");

const redsBtn = document.getElementById("reds");
const whitesBtn = document.getElementById("whites");
const sparklingBtn = document.getElementById("sparkling");
const dessertBtn = document.getElementById("dessert");
const portBtn = document.getElementById("port");

let redsData = [];
let whitesData = [];
let sparklingData = [];
let dessertData = [];
let portData = [];

const redsURL = "https://api.sampleapis.com/wines/reds";
const whitesURL = "https://api.sampleapis.com/wines/whites";
const sparklingURL = "https://api.sampleapis.com/wines/sparkling";
const dessertURL = "https://api.sampleapis.com/wines/dessert";
const portURL = "https://api.sampleapis.com/wines/port";

// デフォルトで赤ワイン選択状態
onload = () => {
  redsBtn.click();
};

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

// 赤ワインAPI呼び出し
const fetchReds = async () => {
  renderLoader();
  const resReds = await fetch(redsURL);
  redsData = await resReds.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderRedList();
  removeLoader();
};

const fetchWhites = async () => {
  // await renderLoader();
  const resWhites = await fetch(whitesURL);
  whitesData = await resWhites.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderRedList();
};

const fetchSparkling = async () => {
  // renderLoader();
  const resSparkling = await fetch(sparklingURL);
  sparklingData = await resSparkling.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderRedList();
};
const fetchDessert = async () => {
  // renderLoader();
  const resDessert = await fetch(dessertURL);
  dessertData = await resDessert.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderRedList();
};
const fetchPort = async () => {
  // renderLoader();
  const resPort = await fetch(portURL);
  portData = await resPort.json(); // APIレスポンスがあるまでJSONメソッドを実行しない
  renderRedList();
};
// 赤ワインリスト作成
const renderRedList = () => {
  for (let i = 0; i < redsData.length; i++) {
    const eachWine = document.createElement("div");
    const wineName = document.createElement("h4");
    const winery = document.createElement("li");
    const location = document.createElement("li");
    const rateStars = document.createElement("li");
    const reviews = document.createElement("li");
    const image = document.createElement("img");

    let rating = Math.floor(redsData[i].rating.average);
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

    eachWine.classList.add("each-wine");
    wineName.textContent = redsData[i].wine;
    winery.textContent = "ワイナリー : " + redsData[i].winery;
    location.textContent = "生産地 : " + redsData[i].location;
    rateStars.textContent = ratingAverage;
    reviews.textContent = redsData[i].rating.reviews;
    image.src = redsData[i].image;

    eachWine.appendChild(image);
    eachWine.appendChild(wineName);
    eachWine.appendChild(winery);
    eachWine.appendChild(location);
    eachWine.appendChild(rateStars);
    eachWine.appendChild(reviews);
    wineLists.appendChild(eachWine);
  }
};

redsBtn.addEventListener("click", fetchReds);
whitesBtn.addEventListener("click", fetchWhites);
sparklingBtn.addEventListener("click", fetchSparkling);
dessertBtn.addEventListener("click", fetchDessert);
portBtn.addEventListener("click", fetchPort);
