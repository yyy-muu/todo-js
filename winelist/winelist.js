const redsURL = "https://api.sampleapis.com/wines/reds";
const whitesURL = "https://api.sampleapis.com/wines/whites";
const sparklingURL = "https://api.sampleapis.com/wines/sparkling";
const dessertURL = "https://api.sampleapis.com/wines/dessert";
const portURL = "https://api.sampleapis.com/wines/port";


const callRedsAPI = async () => {
  const redsBaseData = await fetch(redsURL);
  const reds = await redsBaseData.json();
  console.log(reds);
};



callRedsAPI();
