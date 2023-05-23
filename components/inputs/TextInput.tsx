import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Ref, forwardRef } from "react";

const TextInput = forwardRef(
  ({ label, error, ...rest }: TextInputProps, ref: Ref<HTMLInputElement>) => (
    <div className="form-control">
      <label className="select-none ">
        <span className="text-sm font-semibold">{label}</span>
      </label>
      <input className="input input-bordered input-sm" ref={ref} {...rest} />
      <label className="label p-0 pt-1 min-h-6">
        {error && (
          <span className="label-text text-error">{error?.message}</span>
        )}
      </label>
    </div>
  )
);
TextInput.displayName = "TextInput";

type TextInputProps = {
  label: string;
  error: FieldError | undefined;
} & Omit<UseFormRegisterReturn<string>, "ref">;

export default TextInput;
