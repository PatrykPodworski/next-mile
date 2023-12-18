import emailSchema from "@/utils/emailSchema";
import { object } from "yup";

const bodySchema = object({
  emailAddress: emailSchema,
});

export default bodySchema;
