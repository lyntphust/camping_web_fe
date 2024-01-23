import { CategoryNode, Error } from '@/types'
import useCategories from '@/hooks/catalog/useCategories'

const firstLevelCategoryId = '2'

export default async function useCategoryNav(): Promise<
  [CategoryNode[], Error[]]
> {
  const [categories, errors] = await useCategories([firstLevelCategoryId])

  return [categories[0]?.children || [], errors]
}
