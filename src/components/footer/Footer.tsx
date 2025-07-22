import { Link } from 'react-router-dom';

// TODO Link path 연결, 다국어 지원 필요
const Footer: React.FC = () => {
  const footerItems = [
    { type: 'refundRegulation', name: '환불규정', path: '/' },
    { type: 'companyInfo', name: '회사소개', path: '/' },
  ];

  return (
    <footer className='p-md bg-tertiary'>
      <div className='max-width-container mx-auto flex w-full flex-col items-center justify-center gap-2 text-white'>
        <div className='flex items-center gap-2'>
          {footerItems.map((item) => (
            <Link key={item.type} to={item.path} className='font-bold'>
              {item.name}
            </Link>
          ))}
        </div>

        <div className='flex flex-col items-center gap-1 text-xs *:font-bold'>
          <p>법인명 : (주)해피필</p>
          <p>이메일 : HappypillCustomer@gmail.com</p>
          <p>평일 오전 10:00 ~ 오후 5:00 (토/일/공휴일 휴무)</p>
        </div>

        <div className='flex flex-col items-center gap-1 text-xs opacity-50 *:font-bold'>
          <p>All copyrights, trade marks, service marks belong to the corresponding owners.</p>
          <p>Copyright 2025 Happy Pill LIMITED All Rights.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
