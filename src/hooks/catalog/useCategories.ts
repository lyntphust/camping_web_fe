import useQuery from '@/hooks/useQuery'
import { CategoryNode, Error } from '@/types'
import { gql } from '@apollo/client'

export default async function useCategories(
  categoryIds: string | number | (string | number)[]
): Promise<[CategoryNode[], Error[]]> {
  const [categoriesData, errors] = await useQuery(
    gql`
      query {
        categoryList(filters: { ids: { in: ${JSON.stringify(categoryIds)} } }) {
          id
          uid
          level
          name
          path
          url_path
          url_key
          breadcrumbs {
            category_id
            category_uid
            category_name
            category_level
            category_url_key
          }
          children_count
          children {
            id
            uid
            level
            name
            path
            url_path
            url_key
            children {
              id
              uid
              level
              name
              path
              url_path
              url_key
              children_count
              children {
                id
                uid
                level
                name
                path
                url_path
                url_key
                children {
                  id
                  uid
                  level
                  name
                  path
                  url_path
                  url_key
                }
              }
            }
          }
        }
      }
    `
  )

  if (categoriesData.categoryList) {
    return [categoriesData.categoryList, errors]
  }

  return [categoriesData, errors]
}
