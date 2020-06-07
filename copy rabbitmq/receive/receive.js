var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api')
const port = 3002;


amqp.connect('amqp://localhost',(err,conn) => {
    conn.createChannel((err,ch)=>{
        var queue = 'FirstQueue';

        ch.assertQueue(queue,{durable:false});
        console.log(`waiting for message in ${queue}`)
        ch.consume(queue,(message)=>{
            console.log(`Received ${message.content}`);
        },{noAck:true});
        
    });
});
app.listen(port,()=> console.log(`listing on port ${port}!`))

