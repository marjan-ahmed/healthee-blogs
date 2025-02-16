import Banner from "@/components/Banner";
import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

type IBlog = {
  image: string,
  title: string,
  smallDescription: string,
  buttonText: string
}

export default async function Home() {
  const data = await client.fetch(``); // --> !!!query missing!!!
  console.log(data);
  return (
    <>
    <div className="mx-2 sm:mx-32">
    <Banner />
    <div className="flex flex-wrap justify-around items-center gap-10 mt-10 my-20">
      {data.map((blog: IBlog) => { // comes from components/BlogCard.tsx
         <BlogCard
           blogImage={blog.image}
           blogTitle={blog.title}
           blogShortDescription={blog.smallDescription}
           buttonText={blog.buttonText} slug={""} />
      })}
    </div>
    </div>
    </>
  );
}
