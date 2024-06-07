const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const connectDb = require('./config/db');
connectDb();

const auth = require('./middleware/auth');

const users = require('./routes/user');
const items = require('./routes/items');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(users);
app.use(auth);
app.use(items);
app.get('*', (req, res)=>{
    return res.send('not found')
})
app.post('*', (req, res)=>{
    return res.send('not found')
})


app.listen(port, ()=>{
    console.log('connected to port '+ port + ' succesfully');
});

