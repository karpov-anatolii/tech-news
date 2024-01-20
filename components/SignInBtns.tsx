"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtns() {
  return (
    <>
      <h1 className="text-center mt-8"> Sign In</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => signIn("github")}
          className="flex  items-center gap-4 border p-4 rounded-full hover:bg-slate-100/25 transition"
        >
          <span>
            <Image
              src={"/github-logo.svg"}
              width={30}
              height={30}
              alt="GitHub Logo"
            />
          </span>
          Sign In with GitHub
        </button>

        <button
          onClick={() => signIn("google")}
          className="flex  items-center gap-4 border p-4 rounded-full hover:bg-slate-100/25 transition"
        >
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
}
