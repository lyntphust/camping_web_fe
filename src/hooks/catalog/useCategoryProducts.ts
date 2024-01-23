import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import { CategoryProduct } from '@/types'
import { SearchResult } from '@/types/query'
import { OperationVariables, gql, useSuspenseQuery } from '@apollo/client'
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

export default function useCategoryProducts(
  categoryUid: string,
  currentPage: number = 1
): [SearchResult<CategoryProduct>, Error[], RefetchFunction<any, any>] {
  const {
    data: { products: productsData },
    error,
    refetch,
  } = useSuspenseQuery<
    { products: SearchResult<CategoryProduct> },
    OperationVariables
  >(
    gql`
      query {
        products(
          filter: { category_uid: { eq: "${categoryUid}" } }
          pageSize: ${PRODUCT_LISTING_PAGE_SIZE}
          currentPage: ${currentPage ?? 1}
        ) {
          total_count
          items {
            sku
            name
            image {
              url
              label
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
            review_count
            rating_summary
          }
          page_info {
            current_page
            page_size
          }
        }
      }
    `
  )

  return [productsData, error ? [error as Error] : [], refetch]
}
