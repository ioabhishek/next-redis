import { redis } from "@/lib/redis"
import Link from "next/link"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const commentIds = await redis.lrange("comments", 0, 3)

  const comments = await Promise.all(
    commentIds.map(async (commentId) => {
      const details: any = await redis.hgetall(`comment_details:${commentId}`)
      const tags = await redis.smembers(`tags:${commentId}`)

      return {
        commentId,
        details,
        tags,
      }
    })
  )

  console.log("commetns is", comments)

  return (
    <div className=" flex flex-col gap-8">
      <Link href="/">Homepage</Link>
      {comments.map((comment, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <h1>{comment?.details?.author}</h1>
          <p>{comment?.details?.text}</p>
        </div>
      ))}
    </div>
  )
}

export default page
