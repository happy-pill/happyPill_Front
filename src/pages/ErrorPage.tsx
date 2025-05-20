const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center w-full max-w-[700px] py-10 px-6">
        <div className="flex justify-center mb-8">
          <img
            src="/images/error.png"
            alt="404 illustration"
            className="w-[250px] tablet:w-[300px] desktop:w-[350px]"
          />
        </div>

        <p className="text-12 tablet:text-13 desktop:text-14 text-black mb-2">
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
        </p>
        <p className="text-12 tablet:text-13 desktop:text-14 text-black mb-6">
          홈페이지로 이동해 다양한 상품들을 확인해 보세요.
        </p>

        <a
          href="/"
          className="inline-block bg-button-primary text-white text-12 tablet:text-13 desktop:text-14 px-6 py-2 rounded hover:bg-opacity-80 transition"
        >
          홈페이지 바로가기
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;