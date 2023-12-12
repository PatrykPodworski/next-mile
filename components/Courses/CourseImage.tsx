import Image from "next/image";
import clsx from "clsx";

const CourseImage = ({ src, alt, className, sizes }: CourseImageProps) => {
  return (
    <div className={clsx("aspect-video bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        width={16}
        height={9}
        className="w-full object-cover h-full"
        sizes={sizes}
      />
    </div>
  );
};

type CourseImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export default CourseImage;
