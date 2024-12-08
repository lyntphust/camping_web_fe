import BreadCrumb from "@/components/Breadcrumb";
import CategoryProductList from "@/components/catalog/category/CategoryProductList";
import { categoryDetail } from "@/data";

interface Props {
  params: {
    url: string;
  };
}

export default async function CategoryDetail({ params: { url } }: Props) {
  const category = categoryDetail;

  return (
    <div>
      {/* <CategoryiesList
        breadcrumb={category?.breadcrumbs}
        currentNode={category.name}
      /> */}
      <BreadCrumb
        breadcrumb={category?.breadcrumbs}
        currentNode={category.name}
      />
      <p className="mt-6 font-semibold text-5xl">{category?.name}</p>
      <CategoryProductList categoryUid={category?.uid} />
    </div>
  );
}
