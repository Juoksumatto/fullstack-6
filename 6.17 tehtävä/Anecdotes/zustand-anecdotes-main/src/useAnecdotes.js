import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from './request'

export function useAnecdotes() {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (currentAnecdotes = []) => {
        return [...currentAnecdotes, newAnecdote]
      })
    },

    onError: (error) => {
      if (error instanceof Error) {
        alert(`Anecdote creation failed: ${error.message}`)
      } else {
        alert('Anecdote creation failed: An unknown error occurred')
      }
    },
  })

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  return {
    addAnecdote: (content) => newAnecdoteMutation.mutateAsync({ content, votes: 0 }),
    ...query,
    newAnecdoteMutation,
  }
}
