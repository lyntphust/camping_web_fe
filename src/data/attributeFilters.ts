const attributeFilters = [
  {
    __typename: "Aggregation",
    label: "Price",
    count: 4,
    attribute_code: "price",
    options: [
      {
        __typename: "AggregationOption",
        label: "30-40",
        value: "30_40",
      },
      {
        __typename: "AggregationOption",
        label: "40-50",
        value: "40_50",
      },
      {
        __typename: "AggregationOption",
        label: "50-60",
        value: "50_60",
      },
      {
        __typename: "AggregationOption",
        label: "60-70",
        value: "60_70",
      },
    ],
    position: null,
  },
  {
    __typename: "Aggregation",
    label: "Category",
    count: 3,
    attribute_code: "category_uid",
    options: [
      { __typename: "AggregationOption", label: "Lều dã ngoại", value: "MTI=" },
      {
        __typename: "AggregationOption",
        label: "Lều cắm trại",
        value: "MTU=",
      },
      {
        __typename: "AggregationOption",
        label: "Bạt dã ngoại",
        value: "MzY=",
      },
    ],
    position: null,
  },
  {
    __typename: "Aggregation",
    label: "Color",
    count: 11,
    attribute_code: "color",
    options: [
      { __typename: "AggregationOption", label: "Black", value: "49" },
      { __typename: "AggregationOption", label: "Blue", value: "50" },
      { __typename: "AggregationOption", label: "Brown", value: "51" },
      { __typename: "AggregationOption", label: "Gray", value: "52" },
      { __typename: "AggregationOption", label: "Green", value: "53" },
      {
        __typename: "AggregationOption",
        label: "Lavender",
        value: "54",
      },
      { __typename: "AggregationOption", label: "Orange", value: "56" },
      { __typename: "AggregationOption", label: "Purple", value: "57" },
      { __typename: "AggregationOption", label: "Red", value: "58" },
      { __typename: "AggregationOption", label: "White", value: "59" },
      { __typename: "AggregationOption", label: "Yellow", value: "60" },
    ],
    position: 0,
  },
  {
    __typename: "Aggregation",
    label: "Size",
    count: 5,
    attribute_code: "size",
    options: [
      { __typename: "AggregationOption", label: "XS", value: "166" },
      { __typename: "AggregationOption", label: "S", value: "167" },
      { __typename: "AggregationOption", label: "M", value: "168" },
      { __typename: "AggregationOption", label: "L", value: "169" },
      { __typename: "AggregationOption", label: "XL", value: "170" },
    ],
    position: 0,
  },
  {
    __typename: "Aggregation",
    label: "New",
    count: 2,
    attribute_code: "new",
    options: [
      { __typename: "AggregationOption", label: "0", value: "0" },
      { __typename: "AggregationOption", label: "1", value: "1" },
    ],
    position: 0,
  },
  {
    __typename: "Aggregation",
    label: "Sale",
    count: 2,
    attribute_code: "sale",
    options: [
      { __typename: "AggregationOption", label: "0", value: "0" },
      { __typename: "AggregationOption", label: "1", value: "1" },
    ],
    position: 0,
  },
];

export default attributeFilters;
