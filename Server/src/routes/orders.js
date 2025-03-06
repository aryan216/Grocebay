import {
  createOrder,
  confirmOrder,
  getOrder,
  getOrderById,
  updateOreder,
} from "../controllers/orders/order.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

export const orderRoutes = async (fastify, options) => {
  fastify.addHook("preHandler", async (req, reply) => {
    const isAuthenticated = await verifyToken(req, reply);
    if (!isAuthenticated) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });
  fastify.post("/order", createOrder);
  fastify.get("/order", getOrder);
  fastify.get("/order/:orderId/", getOrderById);
  fastify.patch("/order/:orderId/status", updateOreder);
  fastify.post("/order/:orderId/confirm", confirmOrder);
};
