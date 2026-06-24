import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteList = () => {
    const anecdotes = useAnecdoteStore((state) => state.anecdotes)
    const vote = useAnecdoteStore((state) => state.actions.vote)
    const filter = useAnecdoteStore((state) => state.filter)
    const setNotification = useNotificationStore((state) => state.setNotification)

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    const handleVote = (anecdote) => {
        vote(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`)
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList