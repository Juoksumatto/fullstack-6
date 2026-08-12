import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useAnecdoteStore', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('initializes anecdotes with the data returned by the backend', async () => {
    const backendAnecdotes = [
      { id: 1, content: 'Backend anecdote', votes: 5 },
      { id: 2, content: 'Another backend anecdote', votes: 2 }
    ]

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(backendAnecdotes)
    })

    vi.stubGlobal('fetch', fetchMock)

    const { useAnecdoteStore } = await import('./store')

    await vi.waitFor(() => {
      expect(useAnecdoteStore.getState().anecdotes).toEqual(backendAnecdotes)
    })

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/anecdotes')
  })
})
