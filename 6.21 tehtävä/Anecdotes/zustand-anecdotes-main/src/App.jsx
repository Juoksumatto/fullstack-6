import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'
import { useAnecdoteStore } from './store'
import { useAnecdotes } from './useAnecdotes'
import { NotificationProvider } from './NotificationContext'

function App() {
  const { data, isLoading, isError, error } = useAnecdotes()
  const setAnecdotes = useAnecdoteStore((state) => state.actions.setAnecdotes)

  useEffect(() => {
    if (data) {
      setAnecdotes(data)
    }
  }, [data, setAnecdotes])

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
    <NotificationProvider>
      <div>
        <Notification />
        <FilterAnecdote />
        <h2>Anecdotes</h2>
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </NotificationProvider>
  )
}

export default App