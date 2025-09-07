import mongoose  from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://Lekshmanan:27102004@cluster0.69enl6f.mongodb.net/FOOD-DELIVERY').then(() => console.log("DB Connected"));
}