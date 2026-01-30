import { type SchemaTypeDefinition } from 'sanity'
import {eventCrewType} from './eventType'
import {galleryType} from './galleryType'
import {testType} from './testType'
import {timeValueType} from './timeValueType'
import {durationType} from './durationType'
import {djType} from './djTypes'
import {postType} from './postTypes'
import {eventcommunityType} from './communityeventType'
import {aboutUs} from './pages/AboutUsType'
import {videoSchema}  from './videosTypes'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventCrewType,
    galleryType, 
    testType, 
    timeValueType, 
    durationType, 
    djType, 
    postType,
    eventcommunityType,
    aboutUs,
    videoSchema],
}
