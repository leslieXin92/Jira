import { useCallback, useState } from 'react'

export const useUndo = <T>(initialPresent: T) => {
  interface State {
    past: T[]
    present: T
    future: T[]
  }

  const [state, setState] = useState<State>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState
      if (!past.length) return currentState
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(currentState => {
      const { past, present, future } = currentState
      if (!future.length) return currentState
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1)
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const { past, present } = currentState
      if (newPresent === present) return currentState
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => ({
      past: [],
      present: newPresent,
      future: []
    }))
  }, [])

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
