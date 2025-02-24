import { fullBlog } from "@/app/_lib/interface";
import { client, urlFor } from "../../_lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        image
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-3xl w-full mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Marjan Ahmed - Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>

        {/* Make the image full width on mobile devices */}
        <Image
          src={urlFor(data.image).url()}
          width={800}
          height={800}
          alt="Title Image"
          priority
          className="rounded-md mt-8 border mx-auto w-full sm:w-[800px]" // Full width on mobile, fixed width on larger screens
        />

        <div className="mt-20 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
        </div>
      </div>
    </div>
  );
}