import { useAnecdoteStore } from '../store'

const FilterAnecdotes = () => {
  const filter = useAnecdoteStore((state) => state.filter)
  const setFilter = useAnecdoteStore((state) => state.actions.setFilter)

  return (
    <div>
      filter <input onChange={(e) => setFilter(e.target.value)} value={filter} />
    </div>
  )
}

export default FilterAnecdotes