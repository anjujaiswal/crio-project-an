const bodyParser = require('body-parser')
const express = require('express')
const {default : mongoose} = require('mongoose')
const app = express()

const PORT = 8081;

//routers
const pitchRouter = require('./routes.pitch')
//connect mongoose
mongoose.connect()
const db = "mongodb+srv://Anju:Anju@xharktank.b6bpjzk.mongodb.net/?retryWrites=true&w=majority";
 mongoose.connect(db
,{
  useNewUrlParser:true,
  useUnifiedTopology:true
},err =>{
  if(err)
     console.log(err)
})

app.use(bodyParser.json())
app.use('/pitches', pitchRouter)

app.get('/', (req, res) => {
  res.send('XharkTank App')
})

app.listen(PORT, () => console.log(`Listen on port: ${PORT}`))