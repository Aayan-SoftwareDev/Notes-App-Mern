const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
const dotenv = require("dotenv");

dotenv.config();

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(500, "20 s"),
});

module.exports = {
    ratelimit
};