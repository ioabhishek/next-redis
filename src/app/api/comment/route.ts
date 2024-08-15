import { redis } from "@/lib/redis"
import { nanoid } from "nanoid"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { text, tags } = body

    const commentId = nanoid()

    //retrive and store comment details
    const comment = {
      text,
      tags: {
        typescript: true,
      },
      upvotes: 0,
      time: new Date(),
      author: req.cookies.get("userId")?.value,
    }

    await redis.json.numincrby("comment:ks5cZHLxvL_6uRHhMf0tU", "$.upvotes", 1)

    await Promise.all([
      redis.rpush("comments", commentId),
      redis.json.set(`comment:${commentId}`, "$", comment),
    ])

    // await Promise.all([
    //   redis.rpush("comments", commentId),
    //   redis.sadd(`tags:${commentId}`, tags),
    //   redis.hset(`comment_details:${commentId}`, comment),
    // ])

    return new Response("Ok")
  } catch (error) {
    console.log(error)
  }
}
