import {type SchemaTypeDefinition} from 'sanity'
import {companySettings} from './companySettings'
import {partner} from './partner'
import {project} from './project'
import {stat} from './stat'
import {testimonial} from './testimonial'
import {service} from './service'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [stat, project, testimonial, partner, companySettings, service] as unknown as SchemaTypeDefinition[],
}