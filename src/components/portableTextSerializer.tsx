import React from "react";
import { PortableTextComponents } from "@portabletext/react";

const portableTextSerializer: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="mb-4 mt-8 text-4xl font-montserrat font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 text-3xl font-montserrat font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-8 text-2xl font-montserrat font-medium">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-4 mt-8 text-xl font-montserrat font-normal">{children}</h4>,
    normal: ({ children }) => <p className="text-base leading-relaxed font-nunito">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-5 font-lora">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-5 font-lora">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold font-lora">{children}</strong>,
    em: ({ children }) => <em className="italic font-lora">{children}</em>,
    underline: ({ children }) => <span className="underline font-lora">{children}</span>,
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
