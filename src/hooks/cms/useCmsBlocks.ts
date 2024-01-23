import { gql } from '@apollo/client'
import useQuery from '@/hooks/useQuery'
import { CmsBlock, Error } from '@/types'

export default async function useCmsBlocks(
  identifiers: string | string[]
): Promise<[CmsBlock[], Error[]]> {
  const [cmsBlocksData, errors] = await useQuery(
    gql`
      query {
        cmsBlocks(identifiers: ${JSON.stringify(identifiers)}) {
          items {
            identifier
            title
            content
          }
        }
      }
    `
  )

  if (cmsBlocksData.cmsBlocks) {
    return [cmsBlocksData.cmsBlocks.items, errors]
  }

  return [cmsBlocksData, errors]
}
