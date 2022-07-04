const { default: axios } = require("axios");

function index(req, res) {
  res.render("index");
}

function main(req, res) {
  res.render("web/main");
}

async function exoMain(req, res) {
  try {
    const datos = await axios.get(
      "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=cumulative&select=kepler_name,koi_prad,koi_teq,koi_smass,koi_period&format=json"
    );
    
    const datosFinal = [];

    const filteredData = datos.data.filter(
      (planet) => planet.kepler_name != null
    );
    console.log(filteredData)

    const le = filteredData.length;

    for (let index = 0; index < 21; index++) {
      datosFinal.push(filteredData[Math.floor(Math.random() * (le - 0) + 0)]);
    }

    res.render("web/exoplanets", {datosFinal });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,
  main,
  exoMain,
};
