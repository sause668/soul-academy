import { useEffect, useState } from 'react'

export function useIsClient() {
  const [isClient, setClient] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}