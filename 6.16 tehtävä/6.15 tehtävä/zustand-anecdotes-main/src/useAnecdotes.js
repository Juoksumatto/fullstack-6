import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './request'

export function useAnecdotes() {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
}
