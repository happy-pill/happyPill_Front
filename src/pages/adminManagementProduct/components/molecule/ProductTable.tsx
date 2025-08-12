import { useNavigate } from 'react-router-dom';

import type { AdminProductList } from '@/types/admin';

import Button from '@/components/button/StyledButton';
import Table from '@/components/table/ui/Table';
import { routePath } from '@/constants/path';
import { useDeleteProduct } from '@/hooks/api/admin/management';
import { useGetCategoryDetail } from '@/hooks/api/member/category';
import useModal from '@/hooks/useModal';
import { formatValueToComma } from '@/utils/format';

const TABLE_HEADER = ['썸네일', '이름', '제조사', '간단설명', '카테고리', '가격', '재고', ''];

interface ProductTableProps {
  productList: AdminProductList;
}

const ProductTable = ({ productList }: ProductTableProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { data: categoryItems } = useGetCategoryDetail();
  const mutateDeleteProduct = useDeleteProduct();

  const handleDeleteProduct = (productId: string) => {
    mutateDeleteProduct.mutate(
      { productId: productId },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  const handleOpenModal = (productId: string) => {
    openModal({
      type: 'message',
      props: {
        type: 'confirm',
        message: '정말 삭제하시겠습니까?',
        onConfirm: () => handleDeleteProduct(productId),
      },
    });
  };

  return (
    <Table>
      <Table.Header>
        {TABLE_HEADER.map((item) => (
          <Table.Cell key={item} attribute='th'>
            {item}
          </Table.Cell>
        ))}
      </Table.Header>

      <Table.Body>
        {productList.contents.map((item) => (
          <Table.Row key={item.productId}>
            <Table.Cell type='image'>
              <img src={item.thumbnailUrl} alt={item.productName} width={100} />
            </Table.Cell>
            <Table.Cell>{item.productName}</Table.Cell>
            <Table.Cell>{item.company}</Table.Cell>
            <Table.Cell textAlign='left'>{item.briefDescription}</Table.Cell>
            <Table.Cell>
              {categoryItems?.find(
                (el: { categoryId: string }) => el.categoryId === item.categoryId,
              )?.name ?? ''}
            </Table.Cell>
            <Table.Cell>{formatValueToComma(item.price)}원</Table.Cell>
            <Table.Cell>{formatValueToComma(item.stock)}개</Table.Cell>
            <Table.Cell type='button'>
              <Button variant='gray' size='S' onClick={() => handleOpenModal(item.productId)}>
                삭제
              </Button>
              <Button
                variant='border'
                size='S'
                onClick={() =>
                  navigate(routePath.admin.management.product.edit.route(item.productId))
                }
              >
                수정
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProductTable;
