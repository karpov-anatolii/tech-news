import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/options";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({ where: { id } });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Couldn't fetch post." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { title, content, links, imageUrl, publicId, selectedCategory } =
    await req.json();
  const id = params.id;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error editing post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const id = params.id;

  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error removing post." },
      { status: 500 }
    );
  }
}
