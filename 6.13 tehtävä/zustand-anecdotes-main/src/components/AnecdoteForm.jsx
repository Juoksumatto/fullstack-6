import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteForm = () => {
  const Create = useAnecdoteStore((state) => state.actions.Create)
  const setNotification = useNotificationStore((state) => state.setNotification)
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await Create(content)
    setNotification(`created new anecdote '${content}'`)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm