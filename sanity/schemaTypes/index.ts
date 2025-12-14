import { type SchemaTypeDefinition } from 'sanity'
import {eventCrewType} from './eventType'
import {galleryType} from './galleryType'
import {testType} from './testType'
import {timeValueType} from './timeValueType'
import {durationType} from './durationType'
import {djType} from './djTypes'
import {blogType} from './blogTypes'
import {eventcommunityType} from './communityeventType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventCrewType,
    galleryType, 
    testType, 
    timeValueType, 
    durationType, 
    djType, 
    blogType,
    eventcommunityType],
}
