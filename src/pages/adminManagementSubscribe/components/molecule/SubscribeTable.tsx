import type { AdminUserSubscribeList } from '@/types/admin';

import Table from '@/components/table/ui/Table';
import { formatDateToFullDateSlide } from '@/utils/format';

const tableHeader = ['상품이름', '알림받을 이메일', '주문번호', '배송일'];

interface SubscribeTableProps {
  subscribeList: AdminUserSubscribeList;
}

const SubscribeTable = ({ subscribeList }: SubscribeTableProps) => {
  return (
    <Table>
      <Table.Header>
        {tableHeader.map((item) => (
          <Table.Cell key={item} attribute='th'>
            {item}
          </Table.Cell>
        ))}
      </Table.Header>
      <Table.Body>
        {subscribeList.contents.map((item) => (
          <Table.Row key={item.notifyEmail}>
            <Table.Cell>{item.productName}</Table.Cell>
            <Table.Cell>{item.notifyEmail}</Table.Cell>
            <Table.Cell>{item.subscriptionId}</Table.Cell>
            <Table.Cell>{formatDateToFullDateSlide(item.nextDeliveryDate)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SubscribeTable;
