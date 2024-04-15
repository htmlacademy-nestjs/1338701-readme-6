import { PostType, PrismaClient } from '@prisma/client'

const FIRST_POST_TEXT_UUID = '39614113-7ad5-45b6-8093-06455437e1e3'
const SECOND_POST_TEXT_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202'

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976542'
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd'

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4'
const SECOND_USER_ID = '6581762309c030b503e30512'

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: PostType.TEXT,
      title: 'Заголовок поста',
      authorId: FIRST_USER_ID,
      likes: [FIRST_USER_ID, SECOND_USER_ID],
      postTextId: FIRST_POST_TEXT_UUID
    }
  ]
}

function getPostsText() {
  return [
    {
      id: FIRST_POST_TEXT_UUID,
      announcement: 'Текст объявления',
      content: 'Контент поста'
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPostsText = getPostsText()
  for (const postText of mockPostsText) {
    await prismaClient.postText.upsert({
      where: { id: postText.id },
      update: {},
      create: {
        id: postText.id,
        announcement: postText.announcement,
        content: postText.content
      }
    })
  }

  const mockPost = getPosts()
  for (const post of mockPost) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        type: PostType.TEXT,
        title: post.title,
        likes: post.likes,
        authorId: post.authorId,
        postTextId: post.postTextId
      }
    })
  }

  console.info('🤘️ Database was filled')
}

async function bootstrap() {
  const prismaClient = new PrismaClient()

  try {
    await seedDb(prismaClient)
    globalThis.process.exit(0)
  } catch (error: unknown) {
    console.error(error)
    globalThis.process.exit(1)
  } finally {
    await prismaClient.$disconnect()
  }
}

bootstrap()
