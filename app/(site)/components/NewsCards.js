// components/NewsCard.js

import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({ imageUrl, title, description, link, category, readTime, avatar, author }) => {
  return (
    <Link href={link}>
      <div className="rounded-lg overflow-hidden mb-6 cursor-pointer">
        <div className="relative">
          <Image
            src={imageUrl}
            alt="News Image"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="p-2">
          <div>
            {/* avatar and author */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <Image
                  src={avatar}
                  alt="Author"
                  width={0}
                  height={0}
                  className='w-8 h-8 rounded-full'
                />
              </div>
              <div className="text-gray-600 text-sm">{author}</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            {description}
          </p>
          <div className="mt-3 flex items-center">
            <span className="text-foreground text-sm font-medium hover:underline">
              {category}
            </span>
            <span className="ml-2 text-gray-400 text-xs">• {readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};



export { NewsCard }
