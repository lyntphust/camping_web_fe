import { FormattedNumber } from "react-intl";

interface Props {
  price?: number;
  discount?: number;
  className?: string;
}

export default function ProductPartialPrice({
  price,
  discount,
  className = "",
}: Props) {
  if (!price) {
    return <></>;
  }

  return (
    <div>
      {/* {final_price.value < regular_price.value && <div>Từ</div>} */}
      <div className={`flex gap-2 items-center ${className}`}>
        <span className="line-through text-gray-500 text-[12px]">
          <FormattedNumber value={price * 1000} />
        </span>
        <span className="text-2xl font-semibold">
          <FormattedNumber value={price * 10 * (100 - (discount || 0))} />
        </span>
        {discount && discount > 0 && (
          <span className="w-fit h-fit bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-xl rounded-tr rounded-bl ml-1 uppercase">
            {`${discount}% off`}
          </span>
        )}
      </div>
    </div>
  );
}
