import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { BlogTagEntity } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.entity'
import { BlogTagRepository } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.repository'
import { CreateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/create-tag.dto'
import { UpdateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/update-tag.dto'

@Injectable()
export class BlogTagService {
  constructor(private readonly blogTagRepository: BlogTagRepository) {}

  public async getTag(id: string): Promise<BlogTagEntity> {
    return this.blogTagRepository.findById(id)
  }

  public async getAllTags(): Promise<BlogTagEntity[]> {
    return await this.blogTagRepository.find()
  }

  public async createTag(dto: CreateTagDto): Promise<BlogTagEntity> {
    const { name } = dto
    const existsCategory = (await this.blogTagRepository.find({ name: name.toLowerCase() })).at(0)
    if (existsCategory) {
      throw new ConflictException('A tag with the name already exists')
    }

    const newTag = new BlogTagEntity({ name: name.toLowerCase() })
    await this.blogTagRepository.save(newTag)

    return newTag
  }

  public async deleteTag(id: string): Promise<void> {
    try {
      await this.blogTagRepository.deleteById(id)
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`)
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<BlogTagEntity> {
    const blogTagEntity = await this.getTag(id)
    const newBloTagEntity = Object.assign(blogTagEntity, { ...dto })

    try {
      await this.blogTagRepository.update(newBloTagEntity)
      return blogTagEntity
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`)
    }
  }

  public async getTagsByIds(tagIds?: string[]): Promise<BlogTagEntity[]> {
    if (!tagIds) {
      return []
    }
    const tags = await this.blogTagRepository.findByIds(tagIds)

    if (tags.length !== tagIds.length) {
      const foundTagIds = tags.map((tag) => tag.id)
      const notFoundTagIds = tagIds.filter((tagId) => !foundTagIds.includes(tagId))

      if (notFoundTagIds.length > 0) {
        throw new NotFoundException(`Tag with ids ${notFoundTagIds.join(', ')} not found.`)
      }
    }

    return tags
  }
}
