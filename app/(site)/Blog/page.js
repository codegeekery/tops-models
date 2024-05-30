'use client'
import { NewsCard } from '@/app/(site)/components/NewsCards';
// import sanity client
import clientConfig from '@/sanity.config';
// import sanity groq
import { createClient, groq } from 'next-sanity';
import { BASE_PATH } from "@/utils/endpoint"
// swr
import useSWR from 'swr';
// Library Icons
import {
    LoaderPinwheel,
    ServerCrash,
} from "lucide-react"


export default function Blog() {


    const newsData = [
        {
            imageUrl: 'https://api.time.com/wp-content/uploads/2020/07/president-trump-coronavirus-election.jpg?quality=85&w=364&h=204&crop=1',
            title: "Key player out indefinitely, team's playoff hopes in Jeopardy",
            description: "As a result, the team's chances of making it to the playoffs or succeeding in the playoffs are now in doubt...",
            link: '/path/to/article',
            category: 'Basketball Olympics',
            readTime: 8,
        },
        {
            imageUrl: 'https://api.time.com/wp-content/uploads/2020/07/president-trump-coronavirus-election.jpg?quality=85&w=364&h=204&crop=1',
            title: "Key player out indefinitely, team's playoff hopes in Jeopardy",
            description: "As a result, the team's chances of making it to the playoffs or succeeding in the playoffs are now in doubt...",
            link: '/path/to/article',
            category: 'Basketball Olympics',
            readTime: 8,
        },
        {
            imageUrl: 'https://api.time.com/wp-content/uploads/2020/07/president-trump-coronavirus-election.jpg?quality=85&w=364&h=204&crop=1',
            title: "Key player out indefinitely, team's playoff hopes in Jeopardy",
            description: "As a result, the team's chances of making it to the playoffs or succeeding in the playoffs are now in doubt...",
            link: '/path/to/article',
            category: 'Basketball Olympics',
            readTime: 8,
        },
        {
            imageUrl: 'https://api.time.com/wp-content/uploads/2020/07/president-trump-coronavirus-election.jpg?quality=85&w=364&h=204&crop=1',
            title: "Key player out indefinitely, team's playoff hopes in Jeopardy",
            description: "As a result, the team's chances of making it to the playoffs or succeeding in the playoffs are now in doubt...",
            link: '/path/to/article',
            category: 'Basketball Olympics',
            readTime: 8,
        }
        // Add more news items as needed

    ];

    const { data, error } = useSWR(groq`*[_type == "post"]{
        _id,
        title,
        "slug": slug.current,
        "Categories": categories[]->title,
        "Author": author->name,
        "avatar": author->image.asset->url,
        publishedAt,
        "mainImage": mainImage.asset->url,
        "alt": mainImage.alt,
    }`, query => createClient(clientConfig).fetch(query))

    if (error) return <div className="flex justify-center items-center h-screen"><ServerCrash size={25} /><p className="text-red-500">try again later</p></div>
    if (!data) return <div className="flex justify-center items-center h-screen"><LoaderPinwheel className='animate-spin' size={25} /></div>


    return (
        <>

            {/* https://images.unsplash.com/photo-1716668595976-604426108db1?q=80&amp;w=1528&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */}

            {/* Section Header */}
            <div class=" mx-auto p-5 sm:p-10 md:p-16 relative translate-y-24">
                {/* Trendy New */}
                <div className=" mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((news) => (
                            <NewsCard
                                key={news._id}
                                imageUrl={news.mainImage}
                                title={news.title}
                                description={"probando una descripcion"}
                                link={`${BASE_PATH}/${news.slug}`}
                                category={news.Categories[0]}
                                readTime={8}
                                avatar={news.avatar}
                                author={news.Author}
                            />
                        ))}
                    </div>
                </div>
            </div>



        </>
    )
}