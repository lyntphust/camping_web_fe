import CategoryProductList from "@/components/catalog/category/CategoryProductList";
import { navigationCategories } from "@/data";

interface Props {
  params: {
    key?: string;
  };
}

export default async function CategoryDetail({ params: { key } }: Props) {
  const currentCategory = navigationCategories.find(
    (category) => category.url_key === key
  );

  return (
    <div>
      <p className="mt-6 font-semibold text-5xl">{currentCategory?.name}</p>
      <CategoryProductList categoryId={currentCategory?.id} />
    </div>
  );
}
