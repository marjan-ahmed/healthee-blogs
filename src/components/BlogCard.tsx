'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

export interface IBlogCard {
    blogImage: string; 
    blogTitle: string;
    blogShortDescription: string;
    buttonText: string;
    slug: string;
}

function BlogCard({ blogImage, blogTitle, blogShortDescription, buttonText, slug }: IBlogCard) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Ensure the blogImage is a valid URL or null
    const validImageSrc = blogImage && blogImage.trim() !== "" ? blogImage : null;

    return (
        <div className="w-[325px] h-[450px] relative rounded-md shadow-md shadow-gray-300 overflow-hidden bg-white">
            {/* Image Wrapper */}
            <div className="w-full h-[260px] relative">
                {/* Skeleton Loader (only visible when image is loading) */}
                {!imageLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-t-md" />}

                {/* Render Image only if validImageSrc exists */}
                {validImageSrc ? (
                    <Image
                        src={validImageSrc}
                        alt={blogTitle || "Blog Title"}
                        fill
                        className="rounded-t-md object-cover"
                        onLoadingComplete={() => setImageLoaded(true)}
                    />
                ) : (
                    <Skeleton className="absolute inset-0 h-full w-full rounded-t-md" />
                )}
            </div>

            {/* Content Section */}
            <div className="p-3 space-y-1">
                <h1 className="font-monstserrat font-bold text-lg truncate">
                    {blogTitle || "Loading..."}
                </h1>
                <h3 className="text-sm text-gray-600 font-monstserrat line-clamp-2">
                    {blogShortDescription || "Loading..."}
                </h3>
                <Link href={`/${slug}`} passHref>
                    <Button className="h-9 w-24 font-monstserrat text-sm mt-2 absolute bottom-4">{buttonText}</Button>
                </Link>

            </div>
        </div>
    );
}

export default BlogCard;
