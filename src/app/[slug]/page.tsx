import { client } from '@/sanity/lib/client';
import Image from 'next/image';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    console.log("Slug:", params.slug);

    // Fetch blog data from Sanity
    const query = `*[_type == "blog" && slug.current == $slug]{
        title, 
        smallDescription, 
        "image": image.asset->url, 
        content
    }`;
    
    const data = await client.fetch(query, { slug: params.slug });

    console.log("Fetched Data:", data);

    if (!data.length) {
        return <div className="p-6 text-red-500">Blog not found</div>;
    }

    return (
        <div className="p-6">
            {data.map((blog: any) => (
                <div key={blog.title}>
                    <Image src={blog.image} alt={blog.title} width={600} height={500} />
                    <h1 className="text-2xl font-bold">{blog.title}</h1>
                    <h2>{blog.smallDescription}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}
