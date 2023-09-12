import clsx from "clsx";
import TextInput from "../inputs/TextInput";
import useReviewForm from "./useReviewForm";

const ReviewForm = ({ slug }: ReviewFormProps) => {
  const { submit, register, errors, loading } = useReviewForm(slug);

  return (
    <form className="flex flex-col" onSubmit={submit}>
      <h1 className="text-xl text-neutral-900">Write a review</h1>
      <div className="flex gap-4 w-full">
        <TextInput
          className="basis-1/2"
          label={"Name"}
          error={errors.name}
          {...register("name")}
        />
        <TextInput
          className="basis-1/2"
          label={"Email Address"}
          error={errors.email}
          {...register("email")}
        />
      </div>
      <TextInput
        type="number"
        label={"Rating"}
        error={errors.rating}
        {...register("rating")}
      />
      <TextInput
        label={"Headline"}
        error={errors.headline}
        {...register("headline")}
      />
      <TextInput
        label={"Content"}
        error={errors.content}
        {...register("content")}
      />
      <button
        disabled={loading}
        className={clsx("btn btn-primary", loading && "btn-disabled")}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

type ReviewFormProps = {
  slug: string;
};

export default ReviewForm;
