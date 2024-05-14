import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { CreatePostDto } from '@project/blog-post'

@Injectable()
export class RemoveDuplicateTagsPipe implements PipeTransform<CreatePostDto, CreatePostDto> {
  transform(value: CreatePostDto, { type }: ArgumentMetadata): CreatePostDto {
    console.log(value)

    if (type !== 'param') {
      throw new Error('This pipe must used only with params!')
    }

    let tags = value.tags

    if (tags) {
      tags = [...new Set(value.tags.map((tag) => tag))]
    }

    return {
      ...value,
      tags
    }
  }
}
