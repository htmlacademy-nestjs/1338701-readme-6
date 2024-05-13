export enum ApplicationServiceURL {
  Auth = 'http://localhost:3010/api/auth',
  Users = 'http://localhost:3010/api/users',
  Posts = 'http://localhost:3020/api/posts',
  Upload = 'http://localhost:3030/api/uploader'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5
export const HTTP_CLIENT_TIMEOUT = 3000
