const express = require('express');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(express.json())

const cors = require('cors');
var check = "nun";

const monk = require('monk');
var db = monk(process.env.MONGO_URI || '127.0.0.1/post')

  
var p = db.get('posts');

app.use(cors());

//console.log(posts);


app.get('/',(req,res) => {
    res.json({
        message: 'Sent'}
    )
})

app.get('/post',(req,res) =>{
    p
    .find()
    .then(npost => {
        res.json(npost);
    })
})

function isValid(post){
    return post.name && post.name.toString().trim() != '' && post.text && post.text.toString().trim() != ''
}


app.use( rateLimit({
	windowMs: 15 * 1000,
	max: 1
}));


app.post('/post',(req,res) => {
    if(isValid(req.body)){
        var post = {
            name: req.body.name.toString(),
            text: req.body.text.toString(),
            date: req.body.date.toString()

        }
    
        p
        .insert(post)
        .then((npost) =>{
            res.json(npost)
        } )
        //res.json(post);
        //res.end();
        
        
        
    }
    else{
        res.status(422);
        res.json({
            message: "Idiot, type something"
        })
    }
})

app.listen(5000, () =>{
     console.log("listening on http://localhost:5000");
});
