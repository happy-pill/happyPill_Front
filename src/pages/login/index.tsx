import LoginContainer from './components/organism/LoginContainer';

import LayoutContainer from '@/components/container/LayoutContainer';

const index = () => {
  return (
    <LayoutContainer className='flex' px='px-0' isMaxW={false}>
      <div className='flex-1 bg-[#F6CDB9] bg-[url("../assets/images/login-img.jpg")] bg-cover bg-center' />
      <LoginContainer />
    </LayoutContainer>
  );
};

export default index;
