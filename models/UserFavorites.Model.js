const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")
// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const favoritesSchema = new Schema(
  {
    user: {
      type: { type: Schema.Types.ObjectId, ref: 'User' }
      // unique: true -> Ideally, should be unique, but its up to you
    },
  },{
    exoPlanetId:{
    type:[String],
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

favoritesSchema.statics.createFavorites = async function(userId){
  // Search the database for a user with the username submitted in the form
  
  const findFavorites = await this.findOne({ usernameId:userId})
  try{
    if(!findFavorites){
      const newFavorites = await new this({
      user:userId,
      });

      newFavorites.save()
      return newFavorites
    }
     
   
  }catch(Error){
     console.log(Error)     
  }
} 
/*
favoritesSchema.statics.addNewExo = async function(userId){
  
  try{
  
    if(findFavoriteToUpdate){
      
      const filter = { userId: { $nin: [exoPlanetId] } }
      const update = {usernameId:userId}
      
      let doc = await this.findOneAndUpdate(filter,update,{new:true})
    }
    return doc
   
  }catch(Error){
     console.log(Error)     
  }
}*/

const Favorites = model("Favorite", favoritesSchema);

module.exports = Favorites;
