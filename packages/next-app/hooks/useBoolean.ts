import {  useCallback, useState } from 'react'

interface UseBooleanOutput {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

function useBoolean(defaultValue?: boolean): UseBooleanOutput {
  const [isOpen, setValue] = useState(!!defaultValue)

  const open = useCallback(() => setValue(true), [])
  const close = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(x => !x), [])

  return { isOpen, open, close, toggle }
}

export default useBoolean
