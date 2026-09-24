const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const helmet=require("helmet");
const cors=require("cors");
const rateLimit=require("express-rate-limit");
const bookRoutes=require("./routes/bookRoutes");
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
if(!process.env.MONGODB_URI){console.error("MONGODB_URI is not configured.");process.exit(1);}
app.disable("x-powered-by");
app.set("trust proxy",1);
app.use(helmet());
app.use(cors({origin:true,credentials:true}));
app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({extended:true,limit:"1mb"}));
app.use("/api",rateLimit({windowMs:15*60*1000,max:200,standardHeaders:true,legacyHeaders:false}));
app.get("/health",(_req,res)=>res.json({success:true,database:mongoose.connection.readyState===1?"connected":"disconnected",timestamp:new Date().toISOString()}));
app.use("/api/books",bookRoutes);
app.use((_req,res)=>res.status(404).json({success:false,message:"Route not found"}));
app.use((err,_req,res,_next)=>res.status(err.statusCode||500).json({success:false,message:err.message||"Internal server error"}));
async function start(){await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});console.log("Database connected");app.listen(PORT,()=>console.log(`API running on ${PORT}`));}
if(require.main===module)start().catch(err=>{console.error(err);process.exit(1);});
module.exports=app;
