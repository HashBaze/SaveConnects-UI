import React from 'react'
import Loading from '../components/Loading'

const LoadingPage: React.FC = () => {
  return (
    <>
    <main className="flex-grow overflow-auto p-2">
      <Loading />
    </main>
    </>
  )
}

export default LoadingPage