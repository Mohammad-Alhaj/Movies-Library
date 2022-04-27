"use strict"
const RecipeData=require("./data.json")
const express = require('express')
const cors = require('cors')
const axios = require('axios').default;
require('dotenv').config()
const { send } = require("express/lib/response")
const app = express()
app.use(cors())
const port = 3001

const api_key1=process.env.api_key1

const api_key2=process.env.api_key2



app.get("/favorite",handle)
app.get("/",recipeFun)
app.get("/trending",handleRes)
app.get("/search",handleSearch)


//Function....
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


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
