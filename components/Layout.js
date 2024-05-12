import React from 'react'

const Layout = ({children}) => {
  return (
    <div className="max-w-lg mx-auto  h-full border-l border-r border-twitterBorder">
      {children}
    </div>
  )
}

export default Layout;