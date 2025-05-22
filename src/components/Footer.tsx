const Footer = () => {
  return (
    <footer className="bg-tertiary px-4">
      <div className="max-w-[1280px] mx-auto py-6 text-center">
        <div className="space-x-6 mb-3 text-12 tablet:text-13 desktop:text-14 text-black">
          <a href="/company">회사소개</a>
          <a href="#">문의하기</a>
          <a href="/refund">환불규정</a>
        </div>

        <div className="text-12 tablet:text-13 desktop:text-14 text-black mb-2">
          <p>법인명: (주) 해피필 | 이메일: <a href="mailto:HappypillCustomer@gmail.com" className="underline">HappypillCustomer@gmail.com</a></p>
          <p>평일 오전 10:00 ~ 오후 5:00 (토/일/공휴일 휴무)</p>
        </div>

        <div className="text-8 tablet:text-9 desktop:text-10 text-gray-600">
          <p>All copyrights, trade marks, service marks belong to the corresponding owners.</p>
          <p>Copyright © 2025 Happy Pill LIMITED All Rights.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;