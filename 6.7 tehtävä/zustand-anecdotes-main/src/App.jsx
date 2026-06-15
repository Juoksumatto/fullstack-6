import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import { useAnecdoteStore } from './store'

const App = () => {
  const setAnecdotes = useAnecdoteStore((state) => state.actions.setAnecdotes)

  useEffect(() => {
    fetch('http://localhost:3001/anecdotes')
      .then(response => response.json())
      .then(data => setAnecdotes(data))
  }, [])

  return (
    <div>
      <FilterAnecdote />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App