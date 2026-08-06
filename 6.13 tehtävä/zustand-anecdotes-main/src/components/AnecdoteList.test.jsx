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
})
