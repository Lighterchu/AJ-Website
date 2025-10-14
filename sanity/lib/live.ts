// src/sanity/lib/live.ts
import {serverToken } from '../env'

import { defineLive } from "next-sanity/live";
// import your local configured client
import { client } from "@/sanity/lib/client";

// set your viewer token
const token = serverToken
if (!token) {
  throw new Error("Missing NEXT_PUBLIC_SERVER_TOKEN")
}

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})