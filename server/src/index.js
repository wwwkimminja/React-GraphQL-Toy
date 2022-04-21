import express from 'express';
import cors from 'cors';
import messagesRoute from './routes/messages.js';

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}),
);

messagesRoute.forEach(({method, route, handler}) =>{
    app[method](route,handler)
});
/* app[method](route,handler)

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post('/messages',(req,res)=>{
   
})

app.put('/messages/:id',(req,res)=>{

}) */

app.listen(8000,()=>{
    console.log('server listening on 8000...')
})