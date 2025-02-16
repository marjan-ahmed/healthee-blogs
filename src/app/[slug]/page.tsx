import { client } from '@/sanity/lib/client';
import Image from 'next/image';

export default async function BlogDetailPage({slug}: {slug: string}) {
    const params = slug;
    console.log(params);

    const data = await client.fetch(`[_type == 'blog' slug =="${params}"]{title, smallDescription, "image": image.asset->url, content}`);
    console.log(data) 
    
    return (
        <div className="p-6">
            {data.map((blog:any) => {
                <>
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={500} />
                <h1 className="text-2xl font-bold">{blog.title}</h1>
                <h2>{blog.smallDescription}</h2>
                <h3>{blog.content}</h3>
                    </>
            })}

        </div>
    );
}
