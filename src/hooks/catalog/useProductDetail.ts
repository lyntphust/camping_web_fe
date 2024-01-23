import { Error, ProductDetail } from "@/types"
import { OperationVariables, useSuspenseQuery } from "@apollo/client"
import { RefetchFunction } from "@apollo/client/react/hooks/useSuspenseQuery"
import { productDetailQuery } from "./productDetail.gql"

export default function useProductDetail(
  sku: string
): [ProductDetail | undefined, Error[], RefetchFunction<any, any>] {
  const {
    data: { products: productList },
    error,
    refetch
  } = useSuspenseQuery<
    { products: { items: ProductDetail[] } },
    OperationVariables
  >(productDetailQuery(sku))

  if (productList.items.length === 1) {
    let productData = productList.items[0]

    // Find the category with the longest breadcrumbs and assign it to the product data
    const categoryForBreadcrumb = productData.categories.reduce((a, b) => {
      return (a.breadcrumbs?.length || 0) > (b.breadcrumbs?.length || 0) ? a : b
    }, productData.categories[0])
    productData = {
      ...productData,
      category: categoryForBreadcrumb
    }

    // Get media URLs for gallery entries
    productData = {
      ...productData,
      media_gallery_entries: productData.media_gallery_entries
        .map((entry) => ({
          ...entry,
          url: `${process.env.MAGENTO_BASE_MEDIA_CATALOG_PRODUCT_URL}${entry.file}`
        }))
        .sort((a, b) => a.position - b.position)
        .filter((entry) => entry.disabled === false)
    }

    return [productData, error ? [error as Error] : [], refetch]
  }

  return [undefined, error ? [error as Error] : [], refetch]
}
