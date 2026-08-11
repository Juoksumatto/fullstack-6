import { useAnecdotes } from '../useAnecdotes'
import { useNotificationStore } from '../notificationStore'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const setNotification = useNotificationStore((state) => state.setNotification)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (!content) {
      return
    }

    await addAnecdote(content)
    setNotification(`created new anecdote '${content}'`)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm