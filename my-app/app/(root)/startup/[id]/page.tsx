import { formatDate } from '@/app/utils';
import { STARTUPS_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {Suspense} from "react";
import Link from 'next/link';
export const experimental_ppr = true;
// import markdownit from"markdown-it";
import { simpleMarkdownToHtml } from '@/lib/markdown';
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";
interface Params {
  params: {
    id: string;
  };
}
// const md=markdownit();
// const parsedContent=md.render(post?.pitch || '');

const Page = async ({ params }: Params) => {
  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id: params.id });
  const pitchHtml = post.pitch ? simpleMarkdownToHtml(post.pitch) : null;
  if (!post) {
    return notFound();
  }

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>
            {formatDate(post?._createdAt)}
        </p>
        <h1 className='heading'>{post.title}</h1>
        <p className="sub-heading !max-h-5xl">{post?.description}</p>
    </section>
    <section className='section_container'>
        <img
            src={post?.image}
            alt='Thumbnail'
            className='w-full h-auto rounded-xl'
        />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto' >
            <div className='flex-between gap-5'>
                <Link href="/user/${post.author?._id}" className="flex gap-2 items-center mb-3">
                    <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg' />
                    <div>
                        <p className='text-20-medium'>{post.author.name}</p>
                        <p className='text-26-medium !text-black-300'>@{post.author?.username}</p>
                    </div>
                </Link>
                <p className='category-tag'>{post.category}</p>
            </div>
                <h3 className='text-30-bold'>Pitch Details</h3>
                {pitchHtml?(
  <article
    className="prose" 
    dangerouslySetInnerHTML={{ __html: pitchHtml }} 
  />
):(
    <p className='no-result'>
        No Details Provided
    </p>
)}
                {/* {parsedContent?({
                    <article className="prose max-w-4xl font-work-sans break-all"
                        dangerouslySetInnerHTML={{__html:parsedContent}}
                    />
                }):({
                    <p className='no-result'>
                        No Details Provided
                    </p>
                })} */}
        </div>
        <hr className="divider"/>

        {/* TODO : EDITOR SELECTED STARTUPS*/}
        <Suspense
            fallback={
            <Skeleton className="view_skeleton"/>
        }
        >
            <View id={params.id}/>
        </Suspense>
    </section>
    </>
  );
};

export default Page;