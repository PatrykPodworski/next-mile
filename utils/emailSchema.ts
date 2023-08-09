import { string } from "yup";

const emailRegex = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
);

const emailSchema = string()
  .matches(emailRegex, {
    message: "Invalid email address",
  })
  .required();

export default emailSchema;
