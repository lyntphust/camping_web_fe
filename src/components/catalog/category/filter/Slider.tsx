import { Slider, SliderSingleProps } from "antd";

interface Props {
  min: number;
  max: number;
  onChangeComplete: (value: number[]) => void;
}

export default function SliderFilter({ min, max, onChangeComplete }: Props) {
  const marks: SliderSingleProps["marks"] = {
    0: min.toString(),
    100: max.toString(),
  };

  const minInRange = min / 100;
  const maxInRange = max / 100;

  return (
    <Slider
      range
      defaultValue={[minInRange, maxInRange]}
      onChangeComplete={onChangeComplete}
      marks={marks}
    />
  );
}
