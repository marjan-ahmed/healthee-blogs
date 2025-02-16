import portableTextSerializer from "@/components/portableTextSerializer";
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react';

interface BlogDetailProps {
  params: {
    slug: string;
  }
}

async function BlogDetail({ params }: BlogDetailProps) {
  const query = `
  *[_type == "blog" && slug.current == $slug][0] {
    "currentSlug": slug.current,
    title,
    smallDescription,
    "image": image.asset->url,
    buttonText,
    content
  }`;

  
  const data = await client.fetch(query);

  if (!data) {
    return <p className="text-center mt-20 sm:text-2xl text-xl font-monstserrat">OOPS! 🙁 Blog not found.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="sm:mx-32 mx-2 mt-8">
        <h1>
          <div className="w-56 mx-auto block">
          <span className="font-monstserrat border-b-2 border-gray-300 block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Beenish Ishtiaq - Blog
          </span>
          </div>
          <span className="mt-6 font-monstserrat block text-3xl text-center font-extrabold tracking-tight sm:text-4xl">
            {data.title}
          </span>
          <span className="font-monstserrat block text-lg text-center font-normal tracking-tighter sm:text-md">{data.smallDescription}</span>
        </h1>

        {}
        {data.image && (
          <div className="relative w-full max-w-[1000px] h-[500px] mx-auto mt-8">
          <Image
            src={data.image}
            alt="Title Image"
            priority
            objectFit="cover"
            fill  
            className="rounded-md border"
          />
        </div>
        )}

        {}
        <div className="mt-20 prose prose-blue prose-lg dark:prose-invert mb-20">
        <PortableText value={data.content} components={portableTextSerializer} />
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
