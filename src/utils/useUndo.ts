import { useCallback, useReducer, useState } from 'react'

const UNDO = `UNDO`
const REDO = `REDO`
const SET = `SET`
const RESET = `RESET`

type State<T> = {
  past: T[]
  present: T
  future: T[]
}

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
  newPresent?: T
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { newPresent, type } = action

  switch (type) {
    case UNDO:
      if (!past.length) return state
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future]
      }
    case REDO:
      if (!future.length) return state
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1)
      }
    case SET:
      if (newPresent === present) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: []
      }
  }
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispath] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    dispath({ type: UNDO })
  }, [])

  const redo = useCallback(() => {
    dispath({ type: REDO })
  }, [])

  const set = useCallback((newPresent: T) => {
    dispath({ type: SET, newPresent })
  }, [])

  const reset = useCallback((newPresent: T) => {
    dispath({ type: RESET, newPresent })
  }, [])

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
