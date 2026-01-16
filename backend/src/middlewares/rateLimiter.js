const { ratelimit } = require("../config/upstash");

const rateLimiter = async (_, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) return res.status(429).json({message:"Too many request!"});
        next();
    } catch(e) {
        console.error("server error", e);
        return res.status(500).json({message:"server error"});
    }
};

module.exports = {
    rateLimiter,
};