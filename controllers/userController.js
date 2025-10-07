const Users = require('./../models/users');
const bcrypt = require('bcrypt')
const base64 = require('base-64')

const signup = (req, res) => {
    res.render('signup', {message: null})
}

const loginPage = (req, res) => {
    res.render('login', {message: null})
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.render('signup', {message: "User already exists. Please try login."})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name, email, password: hashPassword });

        await newUser.save();

        return res.render('login', {message: "User created successfully"})

    } catch (error) {
        console.error(error)
        return res.render('signup', {message: "Server error. Please contact support."})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await Users.findOne({email});
        if(!existingUser){
            return res.render('login', {message: "User does not exist. Please sign up."})
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(passwordMatch){
            req.session.userId = existingUser._id;
            return res.redirect('/')
        }else{
            return res.render('login', {message: "Invalid password. Please try again"})
        }
    } catch (error) {
        console.error(error)
        return res.render('login', {message: "Server error. Please contact support."})
    }
}

const allUsers = (req, res) => {
    Users.find()
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.json(err)
    })
}

const logout = (req, res) =>{
    req.session.destroy(() => {
        return res.redirect('/login')
    })
}

module.exports = {
    signup,
    loginPage,
    register,
    login,
    allUsers,
    logout
}