import emailSchema from "@/utils/emailSchema";
import { InferType, array, number, object, string } from "yup";

const itemSchema = object({
  id: string().required(),
  quantity: number().required(),
});

const bodySchema = object({
  emailAddress: emailSchema,
  name: string().required(),
  address: string().required(),
  phone: string().required(),
  items: array(itemSchema).required(),
});

export type Item = InferType<typeof itemSchema>;

export default bodySchema;
