import {orderRoutes} from "./orders.js";
import {authRoutes} from "./auth.js";
import { CategoryRoutes, ProductRoutes } from "./products.js";

const prefix="/api/v1"

export const registerRoutes = async(fastify,options)=>{
    fastify.register(orderRoutes,{prefix:prefix})
    fastify.register(authRoutes,{prefix:prefix})
    fastify.register(CategoryRoutes,{prefix:prefix})
    fastify.register(ProductRoutes,{prefix:prefix})
}