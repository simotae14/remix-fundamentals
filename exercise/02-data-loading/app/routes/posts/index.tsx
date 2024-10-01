import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

type Post = {
  slug: string;
  title: string;
};

async function getPosts() {
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
}

export const loader = async () => {
  const posts = await getPosts();
  return json({posts}); // <-- return the data from the loader
  // return new Response(JSON.stringify(posts), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
};

export default function Posts() {
  const {posts} = useLoaderData<typeof loader>(); // <-- get the data into your UI
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
