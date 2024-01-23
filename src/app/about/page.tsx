import Image from "next/image";

const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-6 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="mx-auto max-w-screen-sm text-center">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          About Us
        </h2>
        <p className="font-light mb-0 text-gray-500 sm:text-xl dark:text-gray-400">
          Who we are and what we do?
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-8/12">
          <Image
            className="w-full h-full"
            src="/logo.svg"
            alt="A group of People"
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
            Who we are?
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Wildnest là một cửa hàng trực tuyến chuyên bán các thiết bị và dụng
            cụ cắm trại. Với sứ mệnh giúp người yêu thích thiên nhiên có những
            trải nghiệm ngoài trời tuyệt vời, Wildnest cung cấp một loạt các sản
            phẩm chất lượng cao, từ lều trại, túi ngủ, bàn ghế gấp, đến các phụ
            kiện cần thiết khác như đèn pin, bếp dã ngoại, và bình nước.
          </p>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Ngoài ra Wildnest cũng cung cấp blog outdoor giúp cho những người
            mới vững tin trong những chuyến đi đầu đời. Không chỉ cung cấp đầy
            đủ thông tin của các sản phẩm giúp cho khách hàng có cái nhìn tổng
            quan, blog Wildnest còn chia sẻ những kinh nghiệm, những mẹo vặt hay
            những quy tắc sinh tồn trong những cuộc phiêu lưu. Cùng với đó là
            những thông tin bổ ích trong việc bảo quản và sữa chữa trang thiết
            bị dã ngoại của mình
          </p>
        </div>
      </div>
      <div className="flex mb-24 flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
            What we do?
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Tại Wildnest, chúng tôi đam mê những chuyến phiêu lưu ngoài trời và
            cam kết mang đến cho bạn những trải nghiệm cắm trại tuyệt vời nhất.
            Sứ mệnh của chúng tôi là cung cấp các thiết bị và phụ kiện cắm trại
            chất lượng cao, đáp ứng mọi nhu cầu của bạn. Dù bạn là người cắm
            trại kỳ cựu hay mới bắt đầu, chúng tôi đều có những sản phẩm cần
            thiết để bạn chuẩn bị cho hành trình của mình. Hãy khám phá và trải
            nghiệm thiên nhiên cùng Wildnest, nơi hành trình của bạn bắt đầu!
          </p>
        </div>
        <div className="w-full lg:w-8/12">
          <Image
            className="w-full h-full rounded-md"
            src="/about_img.png"
            alt="A group of People"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-8/12">
          <Image
            className="w-full h-full"
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of People"
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
            Cooperate with us!
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
            Chúng tôi là Wildnest, một nền tảng chuyên cung cấp các sản phẩm và
            dịch vụ liên quan đến cắm trại và hoạt động ngoài trời. Với sứ mệnh
            mang đến những trải nghiệm tuyệt vời cho những người yêu thích thiên
            nhiên, chúng tôi luôn tìm kiếm cơ hội hợp tác để mở rộng và phát
            triển bền vững.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
