import { create } from 'zustand'

const anecdotesAtStart = [
  {
    id: 1,
    content: 'If it hurts, do it more often',
    votes: 0
  },
  {
    id: 2,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 3,
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    id: 4,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    id: 5,
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    id: 6,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => ({
  content,
  id: getId(),
  votes: 0
})

const sortAnecdotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const FilterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter((anecdote) =>
  anecdote.content.toLowerCase().includes(filter.toLowerCase())),
    anecdotes.sort((a, b) => b.content.localeCompare(a.content))
}

const useAnecdoteStore = create((set) => ({
  anecdotes: sortAnecdotes(anecdotesAtStart),
  filter: '',

  actions: {
    vote: (id) =>
      set((state) => ({
        anecdotes: sortAnecdotes(
          state.anecdotes.map((anecdote) =>
            anecdote.id === id
              ? { ...anecdote, votes: anecdote.votes + 1 }
              : anecdote
          )
        )
      })),

    Create: (content) =>
      set((state) => ({
        anecdotes: sortAnecdotes(
          state.anecdotes.concat(asObject(content))
        )
      })),
    
    setFilter: value =>
      set(() => ({
        filter: value
      }))
  }
}))

export { useAnecdoteStore }