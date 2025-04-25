import '../globals.css';
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

interface StartupCardType {
    _id: number;
    _createdAt: Date;
    views: number;
    author: { _id: number };
    description: string;
    image: string;
    category: string;
    title: string;
}

export default async function Home({
                                       searchParams
                                   }: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;

    // Temporary hardcoded data - replace with real data fetching
    const posts: StartupCardType[] = [{
        _id: 1,
        _createdAt: new Date(),
        views: 55,
        author: { _id: 1 , name: 'Ritesh'},
        description: 'This is description',
        image: "https://wallpaperaccess.com/full/327871.jpg",
        category: 'dogs',
        title: "Cute Dogs",
    }];

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup,<br/>
                    Connect With Entrepreneurs
                </h1>

                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>

                <SearchForm query={query}/>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search Results for "${query}"` : 'All startups'}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post) => (
                            <StartupCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No Startups found</p>
                    )}
                </ul>
            </section>
        </>
    );
}