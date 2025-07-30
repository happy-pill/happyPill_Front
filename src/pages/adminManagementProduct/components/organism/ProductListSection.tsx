import ProductTable from '../molecule/ProductTable';

import type { AdminProductList } from '@/types/admin';

import Pagination from '@/components/pagination/Pagination';

interface ProductListSectionProps {
  productList: AdminProductList;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const ProductListSection = ({
  productList,
  currentPage,
  onChangePage,
}: ProductListSectionProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-16'>
      <ProductTable productList={productList} />

      <Pagination
        currentPage={currentPage}
        totalPage={productList?.totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default ProductListSection;
