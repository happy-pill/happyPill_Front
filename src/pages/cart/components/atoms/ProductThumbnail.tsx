import { Link } from 'react-router-dom';

import { routePath } from '@/constants/path';

interface ProductThumbnailProps {
  productId: string;
  src: string;
  alt: string;
}

const ProductThumbnail = ({ productId, src, alt }: ProductThumbnailProps) => {
  return (
    <Link
      to={routePath.common.product.route(productId)}
      className='h-[clamp(60px,10vw,90px)] w-[clamp(60px,10vw,90px)]'
    >
      <img src={src} alt={alt} className='object-cover' />
    </Link>
  );
};

export default ProductThumbnail;
