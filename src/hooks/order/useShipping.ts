export function useShipping() {
  const shop = { name: "Wildnest", lat: 21.028511, lon: 105.804817 };
  const provinces = [
    { id: 1, name: "Hà Nội", lat: 21.028511, lon: 105.804817 },
    { id: 2, name: "Hồ Chí Minh", lat: 10.77689, lon: 106.700806 },
    { id: 3, name: "Đà Nẵng", lat: 16.047079, lon: 108.20623 },
    { id: 4, name: "Hải Phòng", lat: 20.844912, lon: 106.688084 },
    { id: 5, name: "Cần Thơ", lat: 10.045162, lon: 105.746853 },
    { id: 6, name: "An Giang", lat: 10.521584, lon: 105.125896 },
    { id: 7, name: "Bà Rịa - Vũng Tàu", lat: 10.346123, lon: 107.084263 },
    { id: 8, name: "Bắc Giang", lat: 21.273667, lon: 106.194696 },
    { id: 9, name: "Bắc Kạn", lat: 22.147379, lon: 105.834336 },
    { id: 10, name: "Bạc Liêu", lat: 9.28577, lon: 105.724482 },
    { id: 11, name: "Bắc Ninh", lat: 21.186083, lon: 106.076327 },
    { id: 12, name: "Bến Tre", lat: 10.233046, lon: 106.375461 },
    { id: 13, name: "Bình Dương", lat: 11.01449, lon: 106.65835 },
    { id: 14, name: "Bình Định", lat: 13.776478, lon: 109.223007 },
    { id: 15, name: "Bình Phước", lat: 11.71338, lon: 106.926524 },
    { id: 16, name: "Bình Thuận", lat: 10.980889, lon: 108.262477 },
    { id: 17, name: "Cà Mau", lat: 9.176432, lon: 105.15242 },
    { id: 18, name: "Cao Bằng", lat: 22.665231, lon: 106.257119 },
    { id: 19, name: "Đắk Lắk", lat: 12.667539, lon: 108.037751 },
    { id: 20, name: "Đắk Nông", lat: 12.264648, lon: 107.609809 },
    { id: 21, name: "Điện Biên", lat: 21.382401, lon: 103.016842 },
    { id: 22, name: "Đồng Nai", lat: 10.953856, lon: 106.853073 },
    { id: 23, name: "Đồng Tháp", lat: 10.58337, lon: 105.67313 },
    { id: 24, name: "Gia Lai", lat: 13.98366, lon: 108.007155 },
    { id: 25, name: "Hà Giang", lat: 22.823334, lon: 104.983039 },
    { id: 26, name: "Hà Nam", lat: 20.583519, lon: 105.92299 },
    { id: 27, name: "Hà Tĩnh", lat: 18.355091, lon: 105.887666 },
    { id: 28, name: "Hải Dương", lat: 20.93905, lon: 106.3167 },
    { id: 29, name: "Hậu Giang", lat: 9.784706, lon: 105.470648 },
    { id: 30, name: "Hòa Bình", lat: 20.841999, lon: 105.337245 },
    { id: 31, name: "Hưng Yên", lat: 20.64637, lon: 106.051245 },
    { id: 32, name: "Khánh Hòa", lat: 12.238791, lon: 109.196749 },
    { id: 33, name: "Kiên Giang", lat: 10.01251, lon: 105.080917 },
    { id: 34, name: "Kon Tum", lat: 14.351441, lon: 108.000154 },
    { id: 35, name: "Lai Châu", lat: 22.396428, lon: 103.470667 },
    { id: 36, name: "Lâm Đồng", lat: 11.940419, lon: 108.458313 },
    { id: 37, name: "Lạng Sơn", lat: 21.845882, lon: 106.75754 },
    { id: 38, name: "Lào Cai", lat: 22.338086, lon: 103.970487 },
    { id: 39, name: "Long An", lat: 10.695573, lon: 106.227724 },
    { id: 40, name: "Nam Định", lat: 20.430244, lon: 106.174618 },
    { id: 41, name: "Nghệ An", lat: 18.679585, lon: 105.681335 },
    { id: 42, name: "Ninh Bình", lat: 20.253168, lon: 105.974691 },
    { id: 43, name: "Ninh Thuận", lat: 11.566519, lon: 108.98896 },
    { id: 44, name: "Phú Thọ", lat: 21.322739, lon: 105.210819 },
    { id: 45, name: "Phú Yên", lat: 13.08982, lon: 109.09164 },
    { id: 46, name: "Quảng Bình", lat: 17.467245, lon: 106.59198 },
    { id: 47, name: "Quảng Nam", lat: 15.539353, lon: 108.019103 },
    { id: 48, name: "Quảng Ngãi", lat: 15.119905, lon: 108.801331 },
    { id: 49, name: "Quảng Ninh", lat: 21.006382, lon: 107.292514 },
    { id: 50, name: "Quảng Trị", lat: 16.746579, lon: 107.185117 },
    { id: 51, name: "Sóc Trăng", lat: 9.602521, lon: 105.973904 },
    { id: 52, name: "Sơn La", lat: 21.327738, lon: 103.918826 },
    { id: 53, name: "Tây Ninh", lat: 11.31122, lon: 106.09835 },
    { id: 54, name: "Thái Bình", lat: 20.44627, lon: 106.33699 },
    { id: 55, name: "Thái Nguyên", lat: 21.592196, lon: 105.844046 },
    { id: 56, name: "Thanh Hóa", lat: 19.806692, lon: 105.776599 },
    { id: 57, name: "Thừa Thiên Huế", lat: 16.463713, lon: 107.590866 },
    { id: 58, name: "Tiền Giang", lat: 10.352936, lon: 106.363297 },
    { id: 59, name: "Trà Vinh", lat: 9.934732, lon: 106.345759 },
    { id: 60, name: "Tuyên Quang", lat: 21.823815, lon: 105.215224 },
    { id: 61, name: "Vĩnh Long", lat: 10.25335, lon: 105.972374 },
    { id: 62, name: "Vĩnh Phúc", lat: 21.313203, lon: 105.604573 },
    { id: 63, name: "Yên Bái", lat: 21.722739, lon: 104.911308 },
  ];

  return {
    provinces,
    shop,
    calculateShippingFee: (provinceId: number) => {
      const province = provinces.find((p) => p.id === provinceId);

      if (!province) {
        return 0;
      }

      const toRad = (value: any) => (value * Math.PI) / 180;

      const R = 6371; // Bán kính Trái Đất (km)
      const lat1 = shop.lat;
      const lon1 = shop.lon;
      const lat2 = province.lat;
      const lon2 = province.lon;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      let shippingFee = 0;

      if (distance < 100) {
        shippingFee = 15000;
      } else if (distance >= 100 && distance < 200) {
        shippingFee = 25000;
      } else if (distance >= 200 && distance < 300) {
        shippingFee = 35000;
      } else {
        shippingFee = 40000;
      }

      return shippingFee;
    },
  };
}
