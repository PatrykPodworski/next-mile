import TextInput from "@/components/inputs/TextInput";
import emailSchema from "@/utils/emailSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { useRouter } from "next/router";

const schema = object().shape({
  name: string().required().min(2).max(128),
  email: emailSchema,
  password: string().required().min(8).max(128),
});

type FormData = InferType<typeof schema>;

const useSignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async (data) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    router.push("/auth/confirm-email");
  });

  return { register, errors, submit };
};

const SignUpPage = () => {
  const session = useSession();
  const router = useRouter();
  const { register, errors, submit } = useSignUpForm();

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <>
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
          <button className="btn btn-primary btn-sm" onClick={submit}>
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
    </>
  );
};

export default SignUpPage;
