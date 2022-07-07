const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const favoritesSchema = new Schema(
  {
    userObj: {type:Schema.Types.ObjectId, ref: 'User' },

    exoPlanet:[{
      name:{
        type:String,
        required:true,
       
        },
      rad:{
        type:String,
        required:true,
        
        },
      temp:{
        type:String,
        required:true,
      
        },
      mass:{
        type:String,
        required:true,
        
        },
      period:{
        type:String,
        required:true,
       
        },
      planetId:{
        type:String,
        required:true,
        
        },
    }],
    picOfDay:[{
      picName:{type:String,required:true},
      date:{type:String,required:true}
    }]
    
  },
  {timestamps: true}

  
);

favoritesSchema.statics.createFavorites = async function(userId){
  // Search the database for a user with the username submitted in the form
  try{
    const findFavorites = await this.findOne({ userObj:userId})
    
    if(!findFavorites){
      
      const newFavorites = await this.create({
        userObj:userId,
      });
      
      return newFavorites
    }
  }catch(Error){
     console.log(Error)     
  }
} 

favoritesSchema.statics.addNewExo = async function(userId, planet){
  console.log(planet.planetId)
  const planetPlanetId = planet.planetId
  
  try{ 
      const filter = {userObj:userId}
      //,exoPlanet:{$nin:[{planetId: { $eq:planetPlanetId}}]}
      const update = {$push:{exoPlanet:planet}}
      
      let doc = await this.findOneAndUpdate(filter,update,{new:true})
      console.log("doc ==",doc)
    return doc
   
  }catch(Error){
     console.log(Error)     
  }
}


favoritesSchema.statics.addNewPic = async function(userId, picture){
  try{ 

    let newPicdoc = await this.findOne({userObj:userId})
    if(newPicdoc.picOfDay.find(element=>element.picName===picture.picName)){
      
    }
    else{
      const filter = {userObj:userId}
      const update = {$push:{picOfDay:picture}}
      const newPicdoc = await this.findOneAndUpdate(filter, update,{new:true})
    }
    return newPicdoc
   
  }catch(Error){
     console.log(Error)     
  }
}


const Favorites = model("Favorite", favoritesSchema);

module.exports = Favorites;
