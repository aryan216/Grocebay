import "dotenv/config"
import fastify from "fastify"
import { connect } from "./config/connect.js"
import fastifySocketIO from "fastify-socket.io"
import {registerRoutes} from "./routes/index.js"
import { admin, buildAdminRouter } from "./config/setup.js"

const start = async () => { 
    await connect(process.env.MONGO_URI)
    const app = fastify()

    app.register(fastifySocketIO,{
        cors:{
            origin:"*"
        },
        pingInterval:10000,
        pingTimeout:5000,
        transports:["websocket"]
    })

    await registerRoutes(app);

    await buildAdminRouter(app);

    app.listen({port: 3000,host: "0.0.0.0"},(err,addr)=>{
        if(err) throw err
        console.log(`Server is running on 3000${admin.options.rootPath}`)
    })

    app.ready().then(()=>{
        app.io.on('connection',(socket)=>{
            console.log("a user connected");

            socket.on("join room",(orderId)=>{
                socket.join(orderId);
                console.log(`user joined room ${orderId}`);
            })

            socket.on('disconnect',()=>{
                console.log("user disconnected")
            })
        })
    })
}

start()
