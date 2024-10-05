import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPostListItems } from "~/models/posts.server";


export const loader = async () => {
  const posts = await getPostListItems();
  return json({posts}); // <-- return the data from the loader
  // return json({posts: posts.map((post) => ({
  //   slug: post.slug,
  //   title: post.title,
  // }))}); // <-- return the data from the loader
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
