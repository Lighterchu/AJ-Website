import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;


  const isDev = dataset === "dev";
  const isProd = dataset === "production";

  const label = isDev ? "Development" : isProd ? "Production!!! LIVE SERVER" : "Unknown";
  const color = isDev ? "bg-green-800" : isProd ? "bg-red-800" : "bg-gray-800";
  

  return (
    <>
      <div className={` p-4 text-white ${color}`}>
        <h1 className=' pl-20'>{label} Branch</h1>
      

      <NextStudio config={config} />
      </div>
    </>
  )
}
