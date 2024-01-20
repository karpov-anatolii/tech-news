import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    if (res.ok) {
      const { posts } = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts: TPost[] = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    console.log("Email=", email);

    posts = await getPosts(email);
    console.log(
      "Dashboard POSTS=",
      posts.map((it) => it.title)
    );
  }

  return (
    <div>
      {" "}
      <h1>My Posts </h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={""}
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
          No posts created yet.{" "}
          <Link className=" underline" href="/create-post">
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}
