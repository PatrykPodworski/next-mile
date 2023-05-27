import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { HTMLInputTypeAttribute, Ref, forwardRef } from "react";
import clsx from "clsx";

const TextInput = forwardRef(
  (
    { label, error, className, type = "text", ...rest }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <div className={clsx("form-control", className)}>
      <label className="select-none ">
        <span className="text-sm font-semibold">{label}</span>
      </label>
      <input
        className="input input-bordered input-sm"
        type={type}
        ref={ref}
        {...rest}
      />
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
  className?: string;
  type?: HTMLInputTypeAttribute;
} & Omit<UseFormRegisterReturn<string>, "ref">;

export default TextInput;
