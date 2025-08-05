import { type SchemaTypeDefinition } from 'sanity'
import {eventType} from './eventType'
import {galleryType} from './galleryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType,galleryType],
}
