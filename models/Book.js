const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
title:{type:String,required:true,trim:true,maxlength:200},
author:{type:String,required:true,trim:true,maxlength:150},
isbn:{type:String,required:true,trim:true,uppercase:true,unique:true,index:true,maxlength:32},
category:{type:String,trim:true,maxlength:100,default:"General"},
publishedYear:{type:Number,min:0,max:new Date().getFullYear()+1},
available:{type:Boolean,default:true,index:true}
},{timestamps:true,versionKey:false});
bookSchema.index({title:"text",author:"text",isbn:"text"});
module.exports=mongoose.model("Book",bookSchema);
