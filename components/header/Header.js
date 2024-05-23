import Link from 'next/link'
import { DM_Serif_Display } from 'next/font/google'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
})


export default function Header(props) {
  return (
    <div className={ `header ${dmSerifDisplay.className}` }>
      <h1 className="highlight-test">
        <Link href="/">./highlights</Link>
      </h1>
    </div>
  )
}