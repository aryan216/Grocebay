import {getAllCategories} from "../controllers/products/category.js";
import { getProductsByCategoryId } from "../controllers/products/product.js";

export const CategoryRoutes=async(fastify,options)=>{
    fastify.get("/categories",getAllCategories);
}

export const ProductRoutes =async(fastify,options)=>{
    fastify.get("/products/:categoryId",getProductsByCategoryId);
}