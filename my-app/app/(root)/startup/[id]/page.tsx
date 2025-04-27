import { STARTUPS_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

export const experimental_ppr = true;

interface Params {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Params) => {
  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id: params.id });
  
  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className='text-4xl'>{post.title}</h1>
    </div>
  );
};

export default Page;