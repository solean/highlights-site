import Link from 'next/link'
import { DM_Serif_Display } from 'next/font/google'
import DarkModeToggle from '../darkmodetoggle/DarkModeToggle'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
})


export default function Header(props) {
  return (
    <div className={ `header ${dmSerifDisplay.className}` }>
      <h1 className="highlight-test">
        <div className="flex justify-between items-center w-full">
          <Link href="/">./highlights</Link>
          <DarkModeToggle />
        </div>
      </h1>
    </div>
  )
}