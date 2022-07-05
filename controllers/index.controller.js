const { default: axios } = require("axios");
const { create } = require("hbs");
const Favorites = require("../models/UserFavorites.Model")

function index(req, res) {
  res.render("index");
}

function main(req, res) {
  res.render("web/main");
}

async function exoMain(req, res) {
  try {
    const datos = await axios.get(
      "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=cumulative&select=kepler_name,koi_prad,koi_teq,koi_smass,koi_period,kepid&format=json"
    );
    
    const datosFinal = [];

    const filteredData = datos.data.filter(
      (planet) => planet.kepler_name != null
    );

    const le = filteredData.length;

    for (let index = 0; index < 21; index++) {
      datosFinal.push(filteredData[Math.floor(Math.random() * (le - 0) + 0)]);
    }

    res.render("web/exoplanets", {datosFinal });
  } catch (error) {
    console.log(error);
  }
}

async function exoMainPost(req, res){
  console.log(req.body.exoId)
  try {
    
    const data = await axios.get(
      `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=cumulative&where=kepid like ${req.body.exoId}&select=kepler_name,koi_prad,koi_teq,koi_smass,koi_period,kepid&format=json`
    );
    const planet = await data.data[0]
    res.render('web/exoplanetsPost', {planet})
  } catch (error) {
    console.log(error)
  }
}

/**Pagina usuario funcion que recoje los exoplanetas */
async function userGetExo(req, res){
  console.log('Entra en my universe',req.body)
  console.log(req.session.user._id)

  res.render('user/personal')

  try{

    const newFavorites = await Favorites.createFavorites(req.session.user._id)
    /*if(!newFavorites){
      await Favorites.addNewExo(req.session.user._id)
    }*/
  }catch(error){
    console.log(error)
  } 
  
}

module.exports = {
  index,
  main,
  exoMain,
  exoMainPost,
  userGetExo
};
