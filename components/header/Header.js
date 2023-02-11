import Link from 'next/link'

export default function Header(props) {
  return (
    <div className='header'>
      <h1><Link href="/highlights/0">./highlights</Link></h1>
    </div>
  )
}