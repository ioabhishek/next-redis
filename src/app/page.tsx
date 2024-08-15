"use client"
import axios from "axios"
import Link from "next/link"

export default function Home() {
  const comment = async () => {
    const { data } = await axios.post("/api/comment", {
      text: "hello",
      tags: ["typescript"],
    })
    console.log(data)
  }
  return (
    <div className="flex flex-col gap-8 items-center">
      <Link href="/comments" prefetch={false}>
        See comments
      </Link>
      <button onClick={comment}>make comment</button>
    </div>
  )
}
