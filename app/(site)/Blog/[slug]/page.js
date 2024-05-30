'use client'
// React
import React from 'react';
// Sanity Portable Text
import { PortableText } from "@portabletext/react";
// Next Image
import Image from "next/image";
// Next Sanity Image
import { useNextSanityImage } from 'next-sanity-image';
// Library Icons Lucide
import {
    Loader
} from "lucide-react"
// swr
import useSWR from 'swr';
// Import Sanity Config
import clientConfig from '@/sanity.config';
// Import Sanity Groq
import { createClient, groq } from 'next-sanity';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from "@/utils/endpoint"
import { Button } from "@/components/ui/button"

const SanityImage = ({ node }) => {
    const imageProps = useNextSanityImage(clientConfig, node);
    return (
        <Image
            {...imageProps}
            alt={node.alt}
            style={{ width: '100%', height: 'auto' }}
            sizes="(max-width: 800px) 100vw, 800px"
        />
    );
};
const myPortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value || !value.asset || !value.asset._ref) {
                return null;
            }
            // Fetch the full image object from Sanity using the reference
            return <SanityImage node={value} />;
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold my-8">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold my-6">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold my-4">{children}</h4>,
        h5: ({ children }) => <h5 className="text-lg font-bold my-4">{children}</h5>,
        h6: ({ children }) => <h6 className="text-base font-bold my-4">{children}</h6>,
        normal: ({ children }) => <p className="text-base my-2">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside my-4">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside my-4">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => <code className="bg-gray-200 p-1 rounded">{children}</code>,
        link: ({ value, children }) => {
            const { href, target } = value;
            return (
                <a
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-blue-500 underline"
                >
                    {children}
                </a>
            );
        },
    },
};

export default function Posts({ params }) {

    const router = useRouter();


    const { data: postData, error: postError } = useSWR(
        groq`*[_type == "post" && slug.current == $slug][0]{
          _id,
          title,
          "slug": slug.current,
          "Categories": categories[]->title,
          "Author": author->{
            name,
            "avatarUrl": image.asset->url
          },
          publishedAt,
          "mainImage": mainImage.asset->url,
          "alt": mainImage.alt,
          body,
        }`,
        query => createClient(clientConfig).fetch(query, { slug: params.slug })
    );

    const { data: otherPostsData, error: otherPostsError } = useSWR(
        groq`*[_type == "post" && slug.current != $slug]{
          _id,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "alt": mainImage.alt,
        } | order(publishedAt desc)[0...3]`,
        query => createClient(clientConfig).fetch(query, { slug: params.slug })
    );

    function FormatearFecha(fechaString) {
        // Crear un objeto Date a partir de la cadena de fecha
        const fecha = new Date(fechaString);

        // Extraer los componentes de la fecha
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('default', { month: 'short' });
        const año = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        const am_pm = hora >= 12 ? 'PM' : 'AM';

        // Convertir hora de 24 horas a formato de 12 horas
        hora = hora % 12 || 12;

        // Agregar ceros a la izquierda si es necesario para el formato de hora
        hora = hora < 10 ? '0' + hora : hora;
        minutos = minutos < 10 ? '0' + minutos : minutos;

        // Crear la cadena de fecha formateada
        const fechaFormateada = `${mes} ${dia}, ${año}, ${hora}:${minutos} ${am_pm}`;

        return fechaFormateada;
    }


    if (postError || otherPostsError) return <div className="flex justify-center items-center h-screen text-red-500 text-lg">failed to load</div>
    if (!postData || !otherPostsData) return <div className="flex justify-center items-center h-screen"> <Loader className="size-5 animate-spin" color="white" /> </div>



    return (
        <>
            <div>

                <h1 className="text-3xl font-bold text-center mb-8">{postData.title}</h1>
                <div className="flex items-center justify-center mb-8">
                    <Image className="rounded-full mr-4" src={postData?.Author.avatarUrl} alt={postData?.Author.name} width={40} height={40} />
                    <div className="text-gray-700">
                        <p className="font-semibold">{postData?.Author.name}</p>
                        <p className="text-sm">{FormatearFecha(postData?.publishedAt)}</p>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto p-4">
                    <PortableText value={postData?.body} components={myPortableTextComponents} />
                </div>
                <div className="max-w-3xl mx-auto mt-9 mb-10">
                    <h2 className="text-2xl font-bold mb-4">Mas Contenido</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherPostsData.map(post => (
                            <Link key={post._id} href={`${BASE_PATH}${post.slug}`}>
                                <img className="w-full h-32 object-cover mb-2 p-2" src={post.mainImage} alt={post.alt} />
                                <h3 className="text-lg font-semibold p-2">{post.title}</h3>
                            </Link>
                        ))}
                    </div>
                    <div className="mx-auto mt-8 flex justify-center">
                        <Button onClick={() => router.push("/Blog")}>Volver</Button>
                    </div>
                </div>
            </div>


        </>
    );
}