import React from 'react'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function H1(props: Props) {
  return (
    <div>
      <h1 className='italic text-cyan-50 font-semibold'
      {...props}/>
    </div>
  )
}

export default H1
