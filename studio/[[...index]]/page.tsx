import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-dynamic' // Important!

export const metadata = { title: "Sanity Studio" }
export const viewport = 'width=device-width, initial-scale=1.0'

export default function StudioPage() {
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const label = dataset === 'dev' ? 'Development' : dataset === 'production' ? 'Production' : 'Unknown'
  const color = dataset === 'dev' ? 'bg-green-800' : dataset === 'production' ? 'bg-red-800' : 'bg-gray-800'

  return (
    <div className={`p-4 text-white ${color}`}>
      <h1 className="pl-4">{label} Branch</h1>
      <NextStudio config={config} />
    </div>
  )
}
