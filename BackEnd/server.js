const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const bodyParser = require("body-parser");

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://g00401785:mongostuff@cluster0.bzyqhu3.mongodb.net/?retryWrites=true&w=majority');
}

// task schema for mongoDB
const taskSchema = new mongoose.Schema({
  title:String,
  description:String,
  completed: { type: Boolean, default: false },
  date:String
})

const taskModel = mongoose.model('todos', taskSchema);

// delete task by id
app.delete("/api/task/:id", async(req, res)=>{
  console.log("Delete: "+req.params.id);

  let task = await taskModel.findByIdAndDelete(req.params.id);
  res.send(task);
})

// update a task by id
app.put('/api/task/:id', async(req, res)=>{
  console.log("Update: "+req.params.id);

  let task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(task);
})

// create a task
app.post('/api/task', (req,res)=>{
    console.log(req.body);

    taskModel.create({
      title:req.body.title,
      description:req.body.description,
      date:req.body.date
    })
    .then(()=>{ res.send("Task Created")})
    .catch(()=>{ res.send("Task NOT Created")});

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/tasks', async(req, res)=>{
    
  let tasks = await taskModel.find({});
  res.json(tasks);
})

app.get('/api/task/:identifier',async (req,res)=>{
  console.log(req.params.identifier);

  let task = await taskModel.findById(req.params.identifier);
  res.send(task);
})

// start express app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})