const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")
// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre("save", async function() {
  const user = this
  
  try {
    if (this.isModified("password") || this.isNew){
      const salt = await bcrypt.genSalt(10)
      
      const hash = await bcrypt.hash(user.password, salt)
      
      user.password = hash
    }
  } catch (error) {
    console.log(error)
  }
})

userSchema.statics.createUser = async function(username, password){
  // Search the database for a user with the username submitted in the form
  
  const findUser = await this.findOne({ username })
  try{
    if(!findUser){
      const newUser = await new this({
        username,
        password
        });
        newUser.save()
        return newUser
    }
   
  }catch(Error){
     console.log(Error)     
  }
} 

userSchema.statics.loginUser = async function(username, password){
  
  const findUserLog = await this.findOne({ username })
  
  try{
    if(findUserLog){
      const isSamePassword = await bcrypt.compare(password, findUserLog.password)
        if (isSamePassword) {
          return findUserLog
        }
    }
   
  }catch(Error){
     console.log(Error)     
  }
}


const User = model("User", userSchema);

module.exports = User;
