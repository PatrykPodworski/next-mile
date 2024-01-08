import emailSchema from "@/utils/emailSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

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

const schema = object().shape({
  name: string().required().min(2).max(128),
  email: emailSchema,
  password: string().required().min(8).max(128),
});

type FormData = InferType<typeof schema>;

export default useSignUpForm;
