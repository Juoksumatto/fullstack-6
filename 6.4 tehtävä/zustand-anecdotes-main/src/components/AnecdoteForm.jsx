import { useAnecdoteStore } from '../store'

const AnecdoteForm = () => {
  const Create = useAnecdoteStore((state) => state.actions.Create)
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        Create(content)
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