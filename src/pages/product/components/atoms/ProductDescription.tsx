const ProductDescription = ({ description }: { description: string }) => {
  return <div className='text-[clamp(10px,1.5vw,14px)] text-gray-400'>{description}</div>;
};

export default ProductDescription;
