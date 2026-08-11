import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'
import { useAnecdotes } from './useAnecdotes'

function App() {
  const { isLoading, isError, error } = useAnecdotes()

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return (
      <div>
        <h2>Service unavailable</h2>
        <p>Could not fetch anecdotes from the server.</p>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <FilterAnecdote />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App