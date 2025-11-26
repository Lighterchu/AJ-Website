import { type SchemaTypeDefinition } from 'sanity'
import {eventType} from './eventType'
import {galleryType} from './galleryType'
import {testType} from './testType'
import {timeValueType} from './timeValueType'
import {durationType} from './durationType'
import {aboutUs} from './pages/AboutUsType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    eventType,
    galleryType,
    testType,
    timeValueType, 
    durationType,
    aboutUs],
}
