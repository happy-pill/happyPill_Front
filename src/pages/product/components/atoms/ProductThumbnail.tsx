interface ProductThumbnailProps {
  src: string;
  alt: string;
}

const ProductThumbnail = ({ src, alt }: ProductThumbnailProps) => {
  return (
    <img
      src={src}
      className='h-[150px] w-full rounded-md border-[#E2E2E2] object-cover md:h-auto'
      alt={alt}
    />
  );
};

export default ProductThumbnail;
