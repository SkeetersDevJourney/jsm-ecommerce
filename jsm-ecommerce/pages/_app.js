import React from 'react'

import { StateContext } from '../context/StateContext'
import { Layout } from '../components'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
