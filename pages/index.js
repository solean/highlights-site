import Link from 'next/link'
import Head from 'next/head'
import All from './all'

function Home() {
  return (
    <div>
      <Head>
        <title>highlights</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <All />
      </main>
    </div>
  )
}

export default Home
