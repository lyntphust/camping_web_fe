import useCmsBlocks from '@/hooks/cms/useCmsBlocks'
import { CmsBlock, Error } from '@/types'
import sanitizeBlockContent from '@/util/cms/sanitizeBlockContent'

interface HomePage {
  homePageBlock?: string
}

const useLoadBlock = async (
  identifier: string
): Promise<[CmsBlock, Error[]]> => {
  const [cmsBlocks, cmsBlocksLoadError] = await useCmsBlocks(identifier)

  if (cmsBlocksLoadError.length) {
    return [{} as CmsBlock, cmsBlocksLoadError]
  }

  if (cmsBlocks.length !== 1) {
    return [{} as CmsBlock, [{ message: `Block ${identifier} not found.` }]]
  }

  return [cmsBlocks[0], []]
}

export default async function useHome(): Promise<[HomePage, Error[]]> {
  const [homePage, errors]: [HomePage, Error[]] = [{}, []]

  const [homePageBlock, homePageBlockLoadError] = await useLoadBlock(
    'home-page-block'
  )
  if (homePageBlockLoadError.length) {
    errors.push(...homePageBlockLoadError)
  } else {
    homePage.homePageBlock = sanitizeBlockContent(homePageBlock.content)
  }

  return [homePage, errors]
}
