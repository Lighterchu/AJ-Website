import { type SchemaTypeDefinition } from 'sanity'
import {eventType} from './eventType'
import {galleryType} from './galleryType'
import {testType} from './testType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType,galleryType, testType],
}
