import { useEffect } from 'react'
import { useClerk } from '@clerk/clerk-react'

export default function SsoCallback() {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    handleRedirectCallback()
  }, [handleRedirectCallback])

  return <div>Loading...</div>
}