import { NextResponse } from "next/server";

const internalServerError = (error: string) =>
  NextResponse.json({ error }, { status: 500 });

export default internalServerError;
