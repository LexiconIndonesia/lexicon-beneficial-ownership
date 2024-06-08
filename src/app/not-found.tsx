import Link from 'next/link'
import React from 'react'

// TODO: Update implementation
export default function NotFound (): React.ReactElement {
  return (
    <main className="py-24 text-center">
      <h1>Page not found</h1>
      <Link href={'/'}>Go back to home</Link>
    </main>
  )
}
