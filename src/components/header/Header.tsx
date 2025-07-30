import { CiMenuBurger } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

import Select from '../select/Select';

import { Logo } from '@/assets/icon';
import IconLanguage from '@/assets/icon/IconLanguage';
import { HEADER_HEIGHT_SIZE } from '@/constants/common';
import {
  LOGGEND_IN_ITEMS,
  HEADER_COMMON_ITEMS,
  LOGGEND_OUT_ITEMS,
  HEADER_ICON_SIZE,
} from '@/constants/header';
import { routePath } from '@/constants/path';
import useLocale from '@/hooks/useLocale';
import useLoginedStore from '@/stores/loginedStore';

const Header = () => {
  const navigate = useNavigate();
  const { locale, changeLocale } = useLocale();

  const isLogined = useLoginedStore((state) => state.isLogined);

  const headerItems = isLogined
    ? [...LOGGEND_IN_ITEMS, ...HEADER_COMMON_ITEMS]
    : [...LOGGEND_OUT_ITEMS, ...HEADER_COMMON_ITEMS];

  const onChangeLocale = () => {
    changeLocale(locale === 'ko' ? 'en' : 'ko');
    location.reload();
  };

  return (
    <header
      className='px-md fixed top-0 z-50 flex w-full items-center border-b border-solid border-[#E2E2E2] bg-white'
      style={{ height: `${HEADER_HEIGHT_SIZE}px` }}
    >
      <div className='max-width-container mx-auto flex w-full items-center justify-between'>
        <Link to={routePath.common.root} title='home'>
          <h2>
            <img src={Logo} alt='logo' width={100} />
          </h2>
        </Link>

        {/* pc nav */}
        {isLogined !== null && (
          <nav className='gap-x-md hidden items-center md:flex'>
            <Select
              value={locale === 'ko' ? '한국어' : 'English'}
              onChange={onChangeLocale}
              className='flex items-center justify-center gap-1 rounded-md py-1 text-sm font-semibold hover:bg-gray-50'
            >
              <Select.Trigger
                className='gap-3'
                placeholder={locale === 'ko' ? '한국어' : 'English'}
                icon={<IconLanguage size='20' />}
                iconPosition='left'
              />

              <Select.Content className='border-1 border-[#DEDEDE]'>
                <Select.Group className='grid'>
                  <Select.Item
                    value={locale === 'ko' ? 'en' : 'ko'}
                    className='text-sm font-semibold hover:bg-gray-100'
                  >
                    {locale === 'ko' ? 'English' : '한국어'}
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select>

            {headerItems.map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  if (typeof item.path === 'function' && item.type === 'logout') {
                    item.path();
                  } else {
                    navigate(item.path as string);
                  }
                }}
                className='relative flex flex-col items-center justify-center gap-1'
              >
                {item.type === 'cart' && (
                  <span className='absolute -top-1 right-1 flex aspect-square h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white'>
                    0
                  </span>
                )}
                {item.icon}
                <span className='text-xs font-semibold'>{item.name}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* mo nav */}
      <button className='block md:hidden' onClick={() => console.log('show mobile nav')}>
        <CiMenuBurger size={HEADER_ICON_SIZE} />
      </button>
    </header>
  );
};

export default Header;
