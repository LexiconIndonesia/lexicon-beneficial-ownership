import React from 'react'

function OptionalRendering ({ condition, children }: { condition: boolean, children: React.ReactNode }): React.ReactElement {
  return (
    condition
      ? (
      <div>
        {children}
      </div>
        )
      : <></>
  )
}

export default OptionalRendering
