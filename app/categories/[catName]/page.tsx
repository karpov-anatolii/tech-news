import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../../types";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const { posts } = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function Categories({
  params,
}: {
  params: { catName: string };
}) {
  //   const session = await getServerSession(authOptions);
  //   const email = session?.user?.email;
  //   let posts: TPost[] = [];

  //   if (!session) {
  //     redirect("/sign-in");
  //   }

  let posts: TPost[] | null = [];
  const catName = params.catName;
  if (catName) {
    posts = await getPosts(catName);
  }

  return (
    <div>
      <h1>
        <span className="font-normal">Category: </span>
        {decodeURIComponent(catName)}
      </h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
            date={post.createAt}
            thumbnail={post.imageUrl}
            title={post.title}
            category={post.catName}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className=" py-6">
          No posts in this category created yet.{" "}
          <Link className=" underline" href="/create-post">
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}
