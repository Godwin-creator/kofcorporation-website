import {type SchemaTypeDefinition} from 'sanity'
import {companySettings} from './companySettings'
import {partner} from './partner'
import {project} from './project'
import {stat} from './stat'
import {testimonial} from './testimonial'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [companySettings, stat, project, testimonial, partner] as unknown as SchemaTypeDefinition[],
}