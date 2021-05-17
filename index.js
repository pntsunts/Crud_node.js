const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const user = require('./user');

sequelize.sync().then(() => console.log('Db is ready'));

const app = express()

const port = process.env.PORT || 5000

app.use(express.json());


app.get('/', async(req, res) =>{
    const users = await user.findAll();
    res.send(users)
})

app.get('/user/:id', async(req, res) =>{
    const ReqId = req.params.id;
    const User = await await user.findOne({ where: { id : ReqId}});
    res.send(User);
});

app.delete('/delete/:id', async(req, res) =>{
    const ReqId = req.params.id;
    await user.destroy({ where: {id : ReqId}});
    res.send("User deleted");
})

app.put('/update/:id', async(req, res) =>{
    const ReqId = req.params.id;
    const User = await user.findOne({ where: { id : ReqId}});
    User.username = req.body.username;
    await User.save();
    res.send('Updated');
})

app.post('/add', async(req, res) =>
{
    const person = req.body;

    if (!person.username || person.username.length < 3){
        res.status(401).send("username too short");
        return;
    }
    await user.create(person) ;
    res.send('user inserted');
});

app.listen(port, () =>{
    console.log(`Server is running on portn :http://localhost:${port}`)
});

