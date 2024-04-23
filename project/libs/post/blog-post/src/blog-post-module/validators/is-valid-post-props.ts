import { PostType } from '@project/shared/core'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { PostLinkDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-link.dto'
import { PostPhotoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-photo.dto'
import { PostQouteDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-qoute.dto'
import { PostTextDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-text.dto'
import { PostVideoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-video.dto'

@ValidatorConstraint({ name: 'isValidPostProps', async: false })
export class IsValidPostProps implements ValidatorConstraintInterface {
  validate(postContent: unknown, args: ValidationArguments) {
    const post = args.object as CreatePostDto
    if (!postContent) {
      return false
    }

    const validators: Record<PostType, boolean> = {
      [PostType.Video]: postContent instanceof PostVideoDto,
      [PostType.Text]: postContent instanceof PostTextDto,
      [PostType.Quote]: postContent instanceof PostQouteDto,
      [PostType.Link]: postContent instanceof PostLinkDto,
      [PostType.Photo]: postContent instanceof PostPhotoDto
    }
    return validators[post.type]
  }

  defaultMessage(args: ValidationArguments) {
    const post = args.object as CreatePostDto
    return `Invalid post properties for type ${post.type}`
  }
}
