export type Role = 'USER' | 'ADMIN';

export interface MemberInfo {
  userId: string;
  provider: string;
  nickname: string;
  loginEmail: string;
  notifyEmail: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
