import { HTMLInputTypeAttribute } from "react";

const TextInput = ({ label, type, name, error }: TextInputProps) => (
  <div className="form-control">
    <label className="select-none ">
      <span className="text-sm font-semibold">{label}</span>
    </label>
    <input
      type={type ?? "text"}
      name={name}
      className="input input-bordered input-sm"
    />
    {error && (
      <label className="label">
        <span className="label-text text-error">{error}</span>
      </label>
    )}
  </div>
);

type TextInputProps = {
  label: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  error?: string;
};

export default TextInput;
