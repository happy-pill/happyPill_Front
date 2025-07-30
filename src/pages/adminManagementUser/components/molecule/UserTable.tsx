import type { AdminUserList } from '@/types/admin';

import { IconGoogle, IconKakao } from '@/assets/icon';
import Button from '@/components/button/StyledButton';
import Table from '@/components/table/ui/Table';
import { formatDateToFullDateSlide } from '@/utils/format';

const TABLE_HEADER = ['닉네임', '로그인 이메일', '가입수단', '가입날짜', '탈퇴날짜', ''];

interface UserTableProps {
  userList: AdminUserList;
}

const UserTable = ({ userList }: UserTableProps) => {
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
        {userList.contents.map((item) => (
          <Table.Row key={item.userId}>
            <Table.Cell>{item.nickname}</Table.Cell>
            <Table.Cell>{item.loginEmail}</Table.Cell>
            <Table.Cell type='image'>
              <img
                src={item.provider === 'GOOGLE' ? IconGoogle : IconKakao}
                alt={item.provider}
                width={20}
              />
            </Table.Cell>
            <Table.Cell>{formatDateToFullDateSlide(item.createdAt)}</Table.Cell>
            <Table.Cell>{formatDateToFullDateSlide(item.deletedAt)}</Table.Cell>
            <Table.Cell type='button'>
              {item.isDeleted ? (
                <Button variant='orange' size='S'>
                  복구
                </Button>
              ) : (
                <Button variant='border' size='S'>
                  수정
                </Button>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserTable;
