import { Category } from './schemas/category.schema'

export interface CategoryTree extends Category {
  children?: CategoryTree[]
}
