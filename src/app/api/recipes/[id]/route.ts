import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const db = await connectDB();
    const recipe = await db
      .collection("recipes")
      .findOne({ _id: new ObjectId(params.id) });

    if (!recipe) {
      return new NextResponse("Recipe not found", { status: 404 });
    }

    // 작성자만 삭제할 수 있도록 체크
    if (recipe.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await db.collection("recipes").deleteOne({ _id: new ObjectId(params.id) });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const db = await connectDB();

    const recipe = await db
      .collection("recipes")
      .findOne({ _id: new ObjectId(params.id) });

    if (!recipe) {
      return new NextResponse("Recipe not found", { status: 404 });
    }

    if (recipe.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await db
      .collection("recipes")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: data });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
