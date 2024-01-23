import { Error, ProductAggregation } from '@/types'
import { OperationVariables, gql, useSuspenseQuery } from '@apollo/client'
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery'

export default function useCategoryAttributes(
  categoryUid: string
): [ProductAggregation[], Error[], RefetchFunction<any, any>] {
  const {
    data: {
      products: { aggregations: filters },
    },
    error,
    refetch,
  } = useSuspenseQuery<
    { products: { aggregations: ProductAggregation[] } },
    OperationVariables
  >(
    gql`
      query {
        products(filter: { category_uid: { eq: "${categoryUid}" } }) {
          aggregations {
            label
            count
            attribute_code
            options {
              label
              value
            }
            position
          }
        }
      }
    `
  )

  return [filters, error ? [error as Error] : [], refetch]
}
