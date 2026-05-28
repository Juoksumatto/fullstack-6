import { useAnecdoteStore } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdoteStore((state) => state.anecdotes)
    const vote = useAnecdoteStore((state) => state.actions.vote)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>
                            vote
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList