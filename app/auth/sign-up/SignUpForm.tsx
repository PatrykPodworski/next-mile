"use client";

import useSignUpForm from "./useSignUpForm";
import TextInput from "@/components/inputs/TextInput";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
  const { register, errors, submit } = useSignUpForm();

  return (
    <div className="flex flex-col items-stretch max-w-xs mx-auto">
      <TextInput
        label={"Name"}
        error={errors.name}
        type="text"
        {...register("name")}
      />
      <TextInput
        label={"Email"}
        error={errors.email}
        type="email"
        {...register("email")}
      />
      <TextInput
        label={"Password"}
        error={errors.password}
        type="password"
        {...register("password")}
      />
      <div className="flex gap-2 items-baseline my-4">
        <button className="btn btn-sm border-neutral-300" onClick={submit}>
          Sign up
        </button>
        <Link
          className="text-blue-500 underline hover:text-blue-700"
          href="/forgot-password"
        >
          Forgot password?
        </Link>
      </div>
      <p>
        Already have an account?&nbsp;
        <span
          className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
          onClick={() => signIn()}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default SignUpForm;
