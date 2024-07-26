import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Store Name is missing", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: { name, userId },
    });

    return NextResponse.json(store)
  } catch (error) {
    console.error('[STORE_POST]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
