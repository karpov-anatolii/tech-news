import prisma from "@/lib/prismadb";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeImage = async (publicId: string, id: string) => {
  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    if (id) {
      const post = await prisma.post.update({
        where: { id },
        data: {
          publicId: "",
          imageUrl: "",
        },
      });
    }

    console.log("image removed");
  } catch (error) {
    console.log(error);
  }
};

export async function POST(req: Request) {
  const { publicId, id } = await req.json();
  await removeImage(publicId, id);
  return NextResponse.json({ message: "success" });
}
