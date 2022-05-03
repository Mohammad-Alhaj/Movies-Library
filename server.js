"use strict"
const RecipeData=require("./data.json")
const express = require('express')
const cors = require('cors')
const axios = require('axios').default;
 const bodyParser = require('body-parser');

const { send } = require("express/lib/response")
const app = express()



const { Client } = require('pg');
const { query } = require("express");
const client = new Client(url)


const port = 3001
require('dotenv').config()
const url=process.env.url
const api_key1=process.env.api_key1

const api_key2=process.env.api_key2



//...........
app.use(cors())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())




//routes
app.get("/favorite",handle)
app.get("/",recipeFun)
app.get("/trending",handleRes)
app.get("/search",handleSearch)
app.post("/addMovie",handleAddMovie)
app.get("/getMovies",handleGetMovie)

//Function.................
function handle(req,res){
    res.send("Welcome to Favorite Page ?")
}

function handleRes(req,res){

axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${api_key1}&language`)
.then((result)=> {

  console.log(result.data.results);

let resultss=result.data.results.map(el=>{

  return new Api(el.id, el.title,el.release_date, el.poster_path,el.overview ) 

})
// res.send("Hello guye whatsup")
res.json(resultss[0])

})
.catch((error)=>{

console.log(error);
res.send("error!")


})

}
//handle search function
function handleSearch(req,res){

let name=req.query.name

axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key2}&query=${name}`)



.then((result)=>{
  // res.send("Hi mohammad")
  // console.log(result.data.results);
res.json(result.data.results)
  
})



.catch

console.log(error);
res.send("error!")

}


function recipeFun(req,res){
// res.send ("mohammad")
// console.log(RecipeData);


//constructor

let NewRcs=new Recipe(RecipeData.title,RecipeData.poster_path,RecipeData.overview)
res.json(NewRcs)
}

//addMove (post)and get movie




function handleAddMovie (req,res){

console.log(req.body);
   const {id,titel,release_date,poster_path,overview } = req.body

   let sql = 'INSERT INTO addMovie(id,titel,release_date,poster_path,overview ) VALUES($1, $2, $3, $4,$5) RETURNING *;' 
    let values = [id,titel,release_date,poster_path,overview]

 client.query(sql,values)
 .then((result)=>{

  console.log(result.rows);
   return res.json(result.rows);

 })
 .catch()


}

 function handleGetMovie(req,res){

  let sql =` SELECT * from addMovie`

client.query(sql).then((result)=>{

console.log(result)
res.json(result.rows)



}).catch()







}

client.connect().then(()=>{

   app.listen(port, () => {
     console.log(`Example app listening on port ${port}`);
  });

})




//first task
function Recipe (title,poster_path,overview){
this.title=title;
this.poster_path=poster_path;
this.overview=overview;


}


//3rd id constructor
function Api (id,title,reData,poster_path,overview){

  this.id=id;
  this.title=title;
  this.reData=reData;
  this.poster_path=poster_path;
  this.overview=overview;
}
