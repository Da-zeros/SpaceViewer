const { default: axios } = require("axios");
const { create } = require("hbs");
const Favorites = require("../models/UserFavorites.Model")
const User = require("../models/User.model")
require('dotenv').config();


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
  console.log('registro del planeta',req.body)
  
  try{
    await Favorites.createFavorites(req.session.user._id,)
    const addExo = await Favorites.addNewExo(req.session.user._id, req.body)
    if(addExo){

      const favDoc = await Favorites.find({userObj:req.session.user._id})
      res.render('user/personal',{favDoc,message:"Exoplanet added to your universe!"})
    }else {
      console.log("Entra en error ya existee el planeta")
      res.render('user/personal',{errorMessage:"This planet already is in your universe"})}
    
  }catch(error){
    console.log(error)
  } 
}

async function userGetUniverse(req, res){
  const favDoc = await Favorites.find({userObj:req.session.user._id})
  const addPicOfDayList = await Favorites.find({userObj:req.session.user._id})

  res.render("user/personal",{favDoc,  addPicOfDayList})
}

async function userDelExo(req, res){

  const filter = {userObj:req.session.user._id, }
  const update = {$pull:{exoPlanet:{planetId:req.params.delExoId}}}
  await Favorites.findOneAndUpdate(filter,update,{new:true})
  res.redirect("/myUniverse") 
}

async function picsPage(req, res){
  /**Current date*/
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const data = await 
  axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}`)
  const imageApiData = data.data
  console.log(imageApiData)
  res.render("web/picOfDay",{imageApiData, date})
}

async function piscPagePost(req, res){
  console.log(req.body.date)
  const filteredData = await 
  axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&date=${req.body.date}`)
  const filteredPic = await filteredData.data
  console.log(filteredPic)
  res.render("web/picOfDayPost",{filteredPic}) 
}

async function picsPageParams(req, res){
  try{

    await Favorites.createFavorites(req.session.user._id)
    const addPicOfDay = await Favorites.addNewPic(req.session.user._id, req.query)
    
    if(addPicOfDay){
      const addPicOfDayList = await Favorites.findById(req.session.user._id)
      console.log(addPicOfDayList)
      res.redirect("/picOfDay")
    }
    else{
      res.redirect('/picOfDay',{errorMessage:"This picture already exists in your universe"})
    }
  }
  catch(error){
    console.log(error)
  } 
}

async function userDelPic(req, res){
  console.log(req.params.delPicId)
  const filter = {userObj:req.session.user._id, }
  const update = {$pull:{picOfDay:{picName:req.params.delPicId}}}
  await Favorites.findOneAndUpdate(filter,update,{new:true})
  res.redirect("/myUniverse") 
}



module.exports = {
  index,
  main,
  exoMain,
  exoMainPost,
  userGetExo,
  userGetUniverse,
  userDelExo,
  picsPage,
  piscPagePost,
  picsPageParams,
  userDelPic
};
