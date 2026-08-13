import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './request'

const sortAnecdotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

export function useAnecdotes() {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (currentAnecdotes = []) => {
        return sortAnecdotes(
          currentAnecdotes.map((anecdote) => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
        )
      })
  }})

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  const vote = async (id) => {
    const anecdote = query.data?.find((a) => a.id === id)
    if (!anecdote) return
    await updateAnecdoteMutation.mutateAsync({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (currentAnecdotes = []) => {
        return sortAnecdotes([...currentAnecdotes, newAnecdote])
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

  return {
    vote,
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutateAsync(anecdote),
    addAnecdote: (content) => newAnecdoteMutation.mutateAsync({ content, votes: 0 }),
    ...query,
    newAnecdoteMutation,
  }
}
