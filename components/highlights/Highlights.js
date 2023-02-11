import Highlight from '../highlight/Highlight'

export default function Highlights({ highlights }) {
    highlights = highlights.map((h, key) => {
      return  <Highlight highlight={ h } key={ key } />
    })

    return (
      <div className='highlightsContainer'>
        { highlights }
      </div>
    ) 
}