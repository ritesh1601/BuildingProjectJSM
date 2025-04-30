import { client } from "@/sanity/lib/client";

export async function getSanityIdFromAuthorId(authorId: number): Promise<string | null> {
    const query = `*[_type == "author" && id == $authorId][0]._id`;

    try {
        const sanityId = await client.fetch<string>(query, { authorId });
        return sanityId || null;
    } catch (error) {
        console.error("Failed to fetch Sanity ID:", error);
        return null;
    }
}