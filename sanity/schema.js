import {blockContent} from './schemaTypes/blockContent'
import {category} from './schemaTypes/category'
import {post} from './schemaTypes/post'
import {author} from './schemaTypes/author'
import { Gallery } from './schemaTypes/gallery'

export const schema = {
  types: [post, author, category, blockContent, Gallery],
}
