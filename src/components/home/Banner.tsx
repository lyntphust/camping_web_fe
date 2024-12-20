"use client";

import { Carousel, Button, Image } from "antd";
import { useRouter } from "next/navigation";

export default function HomeBanner() {
  const router = useRouter();
  return (
    <section className="w-full flex">
      <div className="w-1/2 pr-2 rounded-lg">
        <Carousel autoplay>
          <div className="relative">
            <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center">
              <div className="text-[48px]">Cửa Hàng Dã Ngoại</div>
              <div className="py-4">
                Dụng cụ cắm trại và dã ngoại ngoài trời
              </div>
              <Button
                className="rounded-md shadow border text-xl uppercase font-bold"
                size="large"
                onClick={() => {
                  router.push(`/category/what-is-new`);
                }}
              >
                Xem ngay
              </Button>
            </div>
            <Image
              className="rounded-lg"
              preview={false}
              src="./silder-3.jpg"
              width={690}
              height={492}
              alt="image"
            />
          </div>
          <div className="relative">
            <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center">
              <div className="text-[48px]">Địa Điểm Camping</div>
              <div className="py-4">Săn mây Tà Xùa</div>
              <Button
                className="rounded-md shadow border text-xl uppercase font-bold"
                size="large"
                onClick={() => {
                  router.push("/blogs/all");
                }}
              >
                Xem ngay
              </Button>
            </div>
            <Image
              className="rounded-lg"
              preview={false}
              src="./silder-1.jpeg"
              width={690}
              height={492}
              alt="image"
            />
          </div>
          <div className="relative">
            <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center">
              <div className="text-[48px]">Hồ Đồng Đò</div>
              <div className="py-4">Camping thân thiện</div>
              <Button
                className="rounded-md shadow border text-xl uppercase font-bold"
                size="large"
                onClick={() => {
                  router.push("/blogs/all");
                }}
              >
                Xem ngay
              </Button>
            </div>
            <Image
              className="rounded-lg"
              preview={false}
              src="./silder-2.jpg"
              width={690}
              height={492}
              alt="image"
            />
          </div>
          <div className="relative">
            <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center">
              <div className="text-[48px]">Dụng Cụ Nấu Nướng</div>
              <div className="py-4">Bếp nồi dã ngoại xếp gọn</div>
              <Button
                className="rounded-md shadow border text-xl uppercase font-bold"
                size="large"
                onClick={() => {
                  router.push("/category/nau-nuong-dung-cu-an-uong");
                }}
              >
                Xem ngay
              </Button>
            </div>
            <Image
              className="rounded-lg"
              preview={false}
              src="./silder-4.jpg"
              width={690}
              height={492}
              alt="image"
            />
          </div>
        </Carousel>
      </div>
      <div className="w-1/2 pl-2 flex flex-col gap-8">
        <div className="w-full rounded-lg">
          <div className="relative">
            <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center hover:scale-110">
              <div className="text-[48px]">Bàn Ghế Xếp Gọn</div>
              <div className="py-4">Mua ngay với voucher cực hời</div>
              <Button
                className="rounded-md shadow border text-xl uppercase font-bold"
                size="large"
                onClick={() => {
                  router.push("/category/ban-ghe-cam-trai");
                }}
              >
                Xem ngay
              </Button>
            </div>
            <Image
              className="rounded-lg"
              preview={false}
              src="https://dioutdoor.vn/media/2023/08/banner-home-dioutdoor-9.jpg"
              width={706}
              height={230}
              alt="image"
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2 rounded-lg">
            <div className="relative">
              <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center hover:scale-110">
                <div className="text-[40px]">Balo Leo Núi</div>
                <div className="py-4">Trợ lực - xếp gọn</div>
                <Button
                  className="rounded-md shadow border text-xl uppercase font-bold"
                  size="large"
                  onClick={() => {
                    router.push("/category/balo-du-lich");
                  }}
                >
                  Xem ngay
                </Button>
              </div>
              <Image
                className="rounded-lg"
                preview={false}
                src="https://dioutdoor.vn/media/2023/08/banner-home-dioutdoor-3-600x365.jpg.webp"
                width={345}
                height={230}
                alt="image"
              />
            </div>
          </div>
          <div className="w-1/2 rounded-lg">
            <div className="relative">
              <div className="absolute z-10 p-10 flex flex-col text-white inset-0 flex items-center hover:scale-110">
                <div className="text-[40px]">Bếp Du Lịch</div>
                <div className="py-4">Cho hoạt động ngoài trời</div>
                <Button
                  className="rounded-md shadow border text-xl uppercase font-bold"
                  size="large"
                  onClick={() => {
                    router.push("/category/bep-gas-bep-con");
                  }}
                >
                  Xem ngay
                </Button>
              </div>
              <Image
                className="rounded-lg"
                preview={false}
                src="https://dioutdoor.vn/media/2023/08/banner-home-dioutdoor-1-600x365.jpg.webp"
                width={345}
                height={230}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
