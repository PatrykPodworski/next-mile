import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";

const withValidationErrorHandling = <T,>(
  handler: (request: NextRequest) => Promise<T>
) => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
  };
};

export default withValidationErrorHandling;
