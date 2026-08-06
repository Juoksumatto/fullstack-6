

import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('AnecdoteList', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('shows anecdotes from the store sorted by votes', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([])
    })

    vi.stubGlobal('fetch', fetchMock)

    const [{ default: AnecdoteList }, { useAnecdoteStore }] = await Promise.all([
      import('./AnecdoteList'),
      import('../store')
    ])

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/anecdotes')
    })

    const unsortedAnecdotes = [
      { id: 1, content: 'Less votes', votes: 1 },
      { id: 2, content: 'More votes', votes: 5 },
      { id: 3, content: 'Medium votes', votes: 3 }
    ]

    useAnecdoteStore.getState().actions.setAnecdotes(unsortedAnecdotes)

    render(<AnecdoteList />)

    const voteElements = screen.getAllByText(/has \d+/)

    expect(voteElements[0].textContent).toContain('has 5')
    expect(voteElements[1].textContent).toContain('has 3')
    expect(voteElements[2].textContent).toContain('has 1')
  })

  it('only shows anecdotes matching the current filter', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([])
    })

    vi.stubGlobal('fetch', fetchMock)

    const [{ default: AnecdoteList }, { useAnecdoteStore }] = await Promise.all([
      import('./AnecdoteList'),
      import('../store')
    ])

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/anecdotes')
    })

    const anecdotes = [
      { id: 1, content: 'React testing', votes: 2 },
      { id: 2, content: 'Vue testing', votes: 1 },
      { id: 3, content: 'React hooks', votes: 3 }
    ]

    useAnecdoteStore.getState().actions.setAnecdotes(anecdotes)
    useAnecdoteStore.getState().actions.setFilter('React')

    render(<AnecdoteList />)

    expect(screen.getByText('React testing')).toBeDefined()
    expect(screen.getByText('React hooks')).toBeDefined()
    expect(screen.queryByText('Vue testing')).toBeNull()
  })
})
