import { useAnecdoteStore } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdoteStore((state) => state.anecdotes)
    const vote = useAnecdoteStore((state) => state.actions.vote)
    const filter = useAnecdoteStore((state) => state.filter)

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
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