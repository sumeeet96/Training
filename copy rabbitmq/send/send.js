var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api')
const port = 3001;


amqp.connect('amqp://localhost',(err,conn) => {
    conn.createChannel((err,ch)=>{
        var queue = 'FirstQueue';
        var message = { type :'2',connect:'Hello RabbitMQ'};

        ch.assertQueue(queue,{durable:false});
        ch.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
        console.log(`message was sent`);
    });
    setTimeout(()=>{
        conn.close();
        process.exit(0);},500);
})
app.listen(port,()=> console.log(`listing on port ${port}!`))

