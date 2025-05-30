import "dotenv/config.js";
import mongoose from "mongoose";
import {Category,Product} from "./src/model/index.js";
import {categories,products} from "./seedData.js";

async function seedDatabase() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({})
        await Category.deleteMany({})

        const categoryDocs=await Category.insertMany(categories);

        const categoryMap=categoryDocs.reduce((map,category)=>{
            map[category.name]=category._id;
            return map;
        },{});

        const productWithCategoryIds=products.map((product)=>({
            ...product,
            category:categoryMap[product.category]
        }));

        await Product.insertMany(productWithCategoryIds)

        console.log("Database seeded Successfully")

    }catch(error){
        console.error("Error seeding Database",error);
    }finally {
        mongoose.connection.close();
    }
}

seedDatabase();