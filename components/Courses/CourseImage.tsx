import Image from "next/image";
import clsx from "clsx";

const CourseImage = ({ src, alt, className }: CourseImageProps) => {
  return (
    <div className={clsx("aspect-video bg-white", className)}>
      <Image
        src={src}
        alt={alt}
        width={16}
        height={9}
        className="object-contain h-full w-auto mx-auto"
        sizes="100vw"
      />
    </div>
  );
};

type CourseImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default CourseImage;
