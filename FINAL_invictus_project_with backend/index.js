import express from "express"
import ejs from "ejs"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"
import _ from "lodash"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://adityacodesinpython:qwertyuiop@invictus.fsl2lsi.mongodb.net/?retryWrites=true&w=majority");

const userDataSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    languages: [String],
    skills: String,
});

const UserData = mongoose.model('UserData', userDataSchema);

const empDataSchema = new mongoose.Schema({
    email: String,
    password: String,
    institution: String
});

const EmpData = mongoose.model('EmpData', empDataSchema);

app.post('/register', async (req, res) => {
    const userData = new UserData({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        languages: req.body.languages,
        skills: req.body.skills,
    });

    try {
        await userData.save();

        console.log('User Data:', userData);
        res.redirect(`/home/${req.body.firstName}`)
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving user data.');
    }
});

app.post('/emp-register', async (req, res) => {
    const empData = new EmpData({
        institution: req.body.institution,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await empData.save();

        console.log('empData:', empData);
        res.redirect(`/home/Dude`)

    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving emp data.');
    }
});

app.get('/', (req, res) => {
    res.render('student.ejs');
});

app.get('/emp', (req, res) => {
    res.render('employer.ejs');
});

app.get('/home/:name', (req, res) => {
    res.render("home.ejs", {
        name:req.params.name, 
    });
})

app.get('/placement', (req, res) => {
    res.render('placement.ejs');
});

app.get('/analytic', (req, res) => {
    res.render('analytic.ejs');
});

app.get('/inbox', (req, res) => {
    res.render('inbox.ejs');
});

app.get('/profile', (req, res) => {
    res.render('profile.ejs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});



