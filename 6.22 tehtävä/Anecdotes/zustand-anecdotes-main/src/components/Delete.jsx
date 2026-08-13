import { useAnecdoteStore } from '../store'

const Delete = ({ id }) => {
  const deleteAnecdote = useAnecdoteStore((state) => state.actions.deleteAnecdote)

  const handleDelete = () => {
    deleteAnecdote(id)
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default Delete