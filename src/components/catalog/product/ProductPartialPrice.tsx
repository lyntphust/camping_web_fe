import { FormattedNumber, IntlProvider } from "react-intl";

interface Props {
  price?: number;
  discount?: number;
  className?: string;
}

function PriceComponent({ price, discount, className }: Props) {
  if (!price) {
    return <></>;
  }

  if (!discount) {
    return (
      <span className={`text-2xl font-semibold ${className}`}>
        <FormattedNumber
          value={price}
          minimumFractionDigits={0}
          roundingIncrement={1}
        />
      </span>
    );
  }

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <span className="line-through text-gray-500 text-[12px]">
        <FormattedNumber
          value={price}
          minimumFractionDigits={0}
          roundingIncrement={1}
        />
      </span>
      <span className="text-2xl font-semibold">
        <FormattedNumber
          value={price * (1 - (discount || 0) / 100)}
          minimumFractionDigits={0}
          roundingIncrement={1}
        />
      </span>
      {discount && discount > 0 ? (
        <span className="w-fit h-fit bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-xl rounded-tr rounded-bl ml-1 uppercase">
          {`${discount}% off`}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default function ProductPartialPrice({
  price,
  discount,
  className = "",
}: Props) {
  return (
    <IntlProvider locale="vi">
      {/* {final_price.value < regular_price.value && <div>Từ</div>} */}
      <PriceComponent price={price} discount={discount} className={className} />
    </IntlProvider>
  );
}
