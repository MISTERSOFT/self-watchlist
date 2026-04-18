import { useEffect, useState } from 'react'

export function useURLParams() {
  const [urlParams, setUrlParams] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramsToObject = params
      .entries()
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    setUrlParams(paramsToObject)
  }, [window.location.search])

  return {
    urlParams,
  }
}
