import createApolloClient from '@/lib/apollo/client'
import { DocumentNode } from 'graphql'

export default async function useQuery(
  query: DocumentNode
): Promise<[any, any]> {
  let data: any = {},
    errors: any = {}

  try {
    const response = await createApolloClient().query({
      query,
    })

    data = response.data
  } catch (error: any) {
    if (error.graphQLErrors) {
      errors = error.graphQLErrors
    } else {
      errors = [
        {
          message: 'Something went wrong.',
        },
      ]
    }
  }

  return [data, errors]
}
