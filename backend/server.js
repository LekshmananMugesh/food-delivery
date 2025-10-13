import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderModel from "./models/orderModel.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

//app config
const app=express();
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//db connection 
connectDB();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})
// Serve frontend React build
app.use('/', express.static(path.join(__dirname, '../frontend/dist')));

// Serve admin React build
app.use('/admin', express.static(path.join(__dirname, '../admin/dist')));

// Catch-all for React routing (frontend/admin)
app.get('/', (req, res) => {
  if (req.path.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  }
});

if (process.env.NODE_ENV === "production") {
  // Serve the frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

