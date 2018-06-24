console.log('may node be with you');

const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

/*app.listen(3000, function(){
     console.log('listening on 3000')
    })

app.get('/',(req,res) => {
    res.sendfile(__dirname + '/index.html')
})
app.post('/quotes',(req,res) =>{
    console.log(req.body)
})*/


const MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect('mongodb://firstdb:firstdb123@ds261450.mlab.com:61450/nodecrud',(err,client) => {
    //if(err) return console.log(err)
    db = client.db('nodecrud')
    
    app.listen(3000,function() {
        console.log('listening on 3000')
 app.post('/quotes',(req,res) => {
       db.collection('quotes').save(req.body,(err,result) =>{
           //if (err) return console.log(err)

           console.log('saved to database')
           res.redirect('/')
        
        })
    })
    })
})
app.set('view engine','ejs');

app.get('/',(req,res) => {
    db.collection('quotes').find().toArray(function(arr,result) {
        //console.log(results)
        //if(err) return console.log(err)

        res.render('index.ejs', {quotes:result})
    })
})

app.use(bodyParser.json())
app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      //if (err) return res.send(err)
      res.send(result)
    })
  })


