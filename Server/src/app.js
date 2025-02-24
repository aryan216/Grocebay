import "dotenv/config"
import fastify from "fastify"
import { connect } from "./config/connect.js"

const start = async () => { 
    await connect(process.env.MONGO_URI)
    const app = fastify()

    app.listen({port: 3000,host: "0.0.0.0"},(err,addr)=>{
        if(err) throw err
        console.log(`Server is running on 3000`)
    })
}

start()
