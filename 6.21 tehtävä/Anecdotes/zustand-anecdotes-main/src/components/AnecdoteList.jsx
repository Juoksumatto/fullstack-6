import { useAnecdoteStore } from '../store'
import { useNotification } from '../NotificationContext'
import { useAnecdotes } from '../useAnecdotes'
import Delete from './Delete'

const AnecdoteList = () => {
    const { data: anecdotes = [], vote } = useAnecdotes()
    const filter = useAnecdoteStore((state) => state.filter)
    const { showNotification } = useNotification()

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const handleVote = (anecdote) => {
        vote(anecdote.id)
        showNotification(`you voted '${anecdote.content}'`)
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                        {anecdote.votes < 5 && <Delete id={anecdote.id} />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList