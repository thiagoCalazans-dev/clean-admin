import { AmendmentModuleController } from "@/server/adapters/controller/amendment-module-controller";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return await AmendmentModuleController.POST(request);
}

export async function GET(request: Request) {
  return NextResponse.json({ text: "hello world" }, { status: 201 });
}


