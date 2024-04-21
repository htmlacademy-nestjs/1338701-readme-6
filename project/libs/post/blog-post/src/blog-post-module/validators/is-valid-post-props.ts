import { PostType } from '@project/shared/core'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { PostTextDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-text.dto'
import { PostVideoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-video.dto'

@ValidatorConstraint({ name: 'isValidPostProps', async: false })
export class IsValidPostProps implements ValidatorConstraintInterface {
  validate(postContent: unknown, args: ValidationArguments) {
    const post = args.object as CreatePostDto
    if (!postContent) {
      return false
    }

    const validators: Record<any, any> = {
      [PostType.Video]: postContent instanceof PostVideoDto,
      [PostType.Text]: postContent instanceof PostTextDto
    }
    return validators[post.type]
  }

  defaultMessage(args: ValidationArguments) {
    const post = args.object as CreatePostDto
    return `Invalid post properties for type ${post.type}`
  }
}
