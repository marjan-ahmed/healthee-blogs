import portableTextSerializer from "@/components/portableTextSerializer"
import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import type { Metadata } from "next"

export const revalidate = 30

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const query = `*[_type == "blog" && slug.current == "${slug}"][0].title`
  const title = await client.fetch(query)

  return {
    title: title || "Blog Post",
  }
}

export default async function BlogDetail({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const query = `
  *[_type == "blog" && slug.current == "${slug}"] {
    "currentSlug": slug.current,
    title,
    smallDescription,
    "image": image.asset->url,
    buttonText,
    content
  }`

  const data = await client.fetch(query)

  if (!data || data.length === 0) {
    return <p className="text-center mt-20 sm:text-2xl text-xl font-montserrat">OOPS! 🙁 Blog not found.</p>
  }

  const blog = data[0]

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="sm:mx-32 mx-2 mt-8">
        <h1>
          <div className="w-60 mx-auto block">
            <span className="font-montserrat border-b-2 p-1 border-gray-300 block text-base text-center text-primary font-semibold tracking-wide uppercase relative overflow-hidden group">
              <span className="absolute inset-0 bg-gray-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10">Beenish Ishtiaq - Blog</span>
            </span>
          </div>
          <span className="mt-6 font-montserrat block text-3xl text-center font-extrabold tracking-tight sm:text-4xl">
            {blog.title}
          </span>
          <span className="font-montserrat block text-lg text-center font-normal tracking-tighter sm:text-md">
            {blog.smallDescription}
          </span>
        </h1>

        {blog.image && (
          <div className="relative w-full max-w-[1000px] h-[500px] mx-auto mt-8">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt="Title Image"
              priority
              fill
              className="rounded-md border object-cover"
            />
          </div>
        )}

        <div className="mt-20 prose prose-blue prose-lg dark:prose-invert mb-20">
          <PortableText value={blog.content} components={portableTextSerializer} />
        </div>
      </div>
    </div>
  )
}

