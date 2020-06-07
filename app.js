const express = require('express')
const mongoose = require('mongoose')
const url ='mongodb+srv://sumeeet96:f6MhalxaBkfERMGI@cluster0-xkn57.mongodb.net/test?retryWrites=true&w=majority'
///'mongodb+srv://sumeeet96:f6MhalxaBkfERMGI@cluster0-xkn57.mongodb.net/test?retryWrites=true&w=majority'




const upload = require('express-fileupload')
const app = express()
app.use(upload())

//logger

const { httpLogger } = require('./middlewares');
const { logger } = require('./utils');

app.use(httpLogger);

//upload

app.get('/',(req,res)=>{
      res.sendFile(__dirname+'/index.html')
  })

 app.post('/',(req,res)=>{
      if(req.files){
          console.log(req.files)
          var file = req.files.file
          var filename = file.name
          console.log(filename)
            file.mv('./uploads/'+ filename,function(err){
              if (err){
                  res.send(err)
              }else{
                  res.send("FIle uploaded")
              }
          })
      }
  })





mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
const con = mongoose.connection

con.on('open',function(){
    console.log("connected....")
})

app.use(express.json())

const studentRouter = require('./routes/students')
app.use('/students',studentRouter)

app.listen(9000,function(){
    console.log('starting the server...')
})