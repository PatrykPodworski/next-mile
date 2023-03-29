import NextImage from "next/image";

const Image = ({ src, alt }: ImageProps) => (
  <div className="bg-white p-2">
    <div className="relative aspect-video">
      <NextImage src={src} alt={alt} fill className="object-contain" />
    </div>
  </div>
);

type ImageProps = {
  src: string;
  alt: string;
};

export default Image;
