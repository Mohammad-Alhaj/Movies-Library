"use strict"
const RecipeData=require("./data.json")
const express = require('express')
const { send } = require("express/lib/response")
const app = express()
const port = 3001

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get("/favorite",handl)
app.get("/",recipeFun)

function handl(req,res){
    res.send("Welcome to Favorite Page ?")
}

function recipeFun(req,res){
// res.send ("mohammad")
// console.log(RecipeData);

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
