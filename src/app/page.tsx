import Banner from "@/components/Banner";
import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

type IBlog = {
  image: string;
  title: string;
  smallDescription: string;
  buttonText: string;
  slug: string;
};

export default async function Home() {
  const data = await client.fetch(`
  *[_type == 'blog']{
    title,
    smallDescription,
    "image": image.asset->url,
    "slug": slug.current,
    buttonText
  }`);

  console.log(data);

  return (
    <>
      <div className="mx-2 sm:mx-32">
        <Banner />
        <div className="flex flex-wrap justify-around items-center gap-10 mt-10 my-20">
          {data.map((blog: IBlog) => (
            <BlogCard
              key={blog.slug} // Unique key for React
              blogImage={blog.image}
              blogTitle={blog.title}
              blogShortDescription={blog.smallDescription}
              buttonText={blog.buttonText}
              slug={blog.slug}
            />
          ))}
        </div>
      </div>
    </>
  );
}
