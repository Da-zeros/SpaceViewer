const User = require("../models/User.model")
const validator = require('validator');

function signup(req, res){
    res.render("auth/signup");
}


async function signupPost(req, res){

    const { username, password } = req.body;
    
    if(validator.isEmpty(username) || validator.isEmpty(password)){
        return res
            .status(500)
            .render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username and password.'});
        }
    if (!validator.isStrongPassword(password)) {
        return res
          .status(500)
          .render('auth/signup', { errorMessage: 'Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter and especial caracter.' });
      }

    try {
        const user = await User.createUser( username, password)
        if (user) return res.render("auth/login")
        else{
            return res.status(400).render("auth/signup", {
                errorMessage:
                "Username need to be unique. The username you chose is already in use.",
            });
        }
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res
                .status(400)
                .render("auth/signup", { errorMessage: error.message });
            }
            
            return res
            .status(500)
            .render("auth/signup", { errorMessage: error.message });
    }
      
}

function login(req, res){
    res.render("auth/login");
}

async function loginPost(req, res, next){
    
    const { username, password } = req.body;

    if(validator.isEmpty(username) || validator.isEmpty(password)){
        return res
            .status(500)
            .render('auth/login', { errorMessage: 'All fields are mandatory. Please provide your username and password.'});
    }

    try {
        
        const userLoged = await User.loginUser(username, password)
 
      // If the user isn't found, send the message that user provided wrong credentials
      if (!userLoged) {
            res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
        });
      }else{
        req.session.user = userLoged;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/home");
      }

    } catch (err) {
         // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    }  
}

function logOut(req, res){
    req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .render("auth/logout", { errorMessage: err.message });
        }
        res.redirect("/");
      });
}

module.exports = {
    signup,
    signupPost,
    login,
    loginPost,
    logOut
}