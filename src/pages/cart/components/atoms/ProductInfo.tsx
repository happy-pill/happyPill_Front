interface ProductInfoProps {
  productName: string;
  briefDescription: string;
}
const ProductInfo = ({ productName, briefDescription }: ProductInfoProps) => {
  return (
    <>
      <p className='text-[clamp(11px,1vw,16px)] font-bold'>{productName}</p>
      <p className='mt-[clamp(5px,1vw,7px)] line-clamp-2 text-[clamp(10px,1vw,13px)] leading-[clamp(12px,1vw,17px)] text-[#666666]'>
        {briefDescription}
      </p>
    </>
  );
};

export default ProductInfo;
