

export const verifyToken=(req,reply)=>{
    try{
        const authHeader=req.headers["authorization"]
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return reply.status(400).send({message:"Access Token Required"});
        }
        const token=authHeader.split("")[1];

        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user=decoded;
        return true;

    }catch(error){
        return reply.status(403).send({message:"Invalid token"});
    }

}