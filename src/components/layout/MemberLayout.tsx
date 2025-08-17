import PageTitle from '../common/PageTitle';
import LayoutContainer from '../container/LayoutContainer';
import MypageNavigation from '../navigation/MypageNavigation';

interface MemberLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
}

const MemberLayout = ({ pageTitle, children }: MemberLayoutProps) => {
  return (
    <LayoutContainer className='flex'>
      <MypageNavigation />
      <article className='w-full p-[20px]'>
        <PageTitle className='border-b border-[#323232]'>{pageTitle}</PageTitle>
        {children}
      </article>
    </LayoutContainer>
  );
};

export default MemberLayout;
