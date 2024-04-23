import { PostType } from '@project/shared/core'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'

@ValidatorConstraint({ name: 'isValidPostContent', async: false })
export class IsValidPostContent implements ValidatorConstraintInterface {
  validate(postContent: unknown, args: ValidationArguments) {
    const post = args.object as CreatePostDto
    const contentFields = ['postVideo', 'postText', 'postQuote', 'postPhoto', 'postLink']
    const providedFields = contentFields.filter((field) => post[field as keyof typeof postContent])
    return providedFields.length === 1
  }

  defaultMessage(args: ValidationArguments) {
    const post = args.object as CreatePostDto
    const fieldsMap: Record<PostType, string> = {
      [PostType.Video]: 'postVideo',
      [PostType.Text]: 'postText',
      [PostType.Quote]: 'postQuote',
      [PostType.Link]: 'postLink',
      [PostType.Photo]: 'postPhoto'
    }
    return `Exactly the following field should be provided: ${fieldsMap[post.type]}`
  }
}
