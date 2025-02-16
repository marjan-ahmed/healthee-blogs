import React from "react";
import { PortableTextComponents } from "@portabletext/react";

const portableTextSerializer: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="mb-4 mt-8 text-4xl font-monstserrat font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-monstserrat font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-8 text-2xl font-monstserrat font-medium">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-4 mt-8 text-xl font-monstserrat font-normal">{children}</h4>,
    normal: ({ children }) => <p className="text-base leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
  types: {
    image: ({ value }) => (
      <div className="my-4 flex justify-center">
        <img src={value.asset.url} alt="Blog Image" className="rounded-md shadow-md" />
      </div>
    ),
  },
};

export default portableTextSerializer;
