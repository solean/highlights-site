import Link from 'next/link'
import Head from 'next/head'

function Home() {
  return (
    <div>
      <Head>
        <title>Highlights</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <h2>Highlights</h2>
        <ul>
          <li>
            <Link href="/books">Books</Link>
          </li>
          <li>
            <Link href="/all"><a>All</a></Link>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Home
