import Banner from "@/components/Banner";
import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";
import { simpleBlogCard } from "./_lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; 

async function getData() {
  const data = await client.fetch(` 
  *[_type == 'blog']{
    title,
    smallDescription,
    "image": image.asset->url,
    "slug": slug.current,
    buttonText
  }`);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data)
  return (
    <>
   <div className="mx-2 sm:mx-32">
    <Banner />
     <div className="flex items-center justify-center sm:justify-start h-screen mt-[-100px] sm:mt-[-70px] line-clamp-none">
    <div className="flex flex-wrap gap-5 justify-center sm:justify-between">
      {data.map((blog, slug) => (
      <Card key={slug} className="w-72 flex hover:scale-105 transition-all flex-col items-center justify-between">
  <Image
    src={blog.image}
    alt="image"
    width={300}
    height={200}
    className="w-full h-[260px] object-cover rounded-t-lg"
  />
  <CardContent className="flex-1 w-full p-4 flex flex-col items-start">
    <h3 className="text-lg font-bold font-montserrat">{blog.title}</h3>
    <p className="text-sm mt-2 font-montserrat text-slate-400 dark:text-gray-300">
      {blog.smallDescription || "Loading..."}
    </p>
    <div className="mt-auto w-full">
      <Button asChild className="w-full mt-7 font-montserrat">
        <Link href={`/blog/${blog.slug}`}>Read More</Link>
      </Button>
    </div>
  </CardContent>
</Card>
      ))}
    </div>
  </div>
  </div>
    </>
  );
}
