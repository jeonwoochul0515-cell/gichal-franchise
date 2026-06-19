// 공개 콘텐츠 API — 현재 사이트 콘텐츠(JSON) 반환. 공개 사이트가 런타임에 fetch
import { json, type Env } from '../_lib/auth'
import { loadContent } from '../_lib/defaultContent'

export const onRequestGet = async (context: { env: Env }): Promise<Response> => {
  const content = await loadContent(context.env.CONTENT)
  return json(content, 200, { 'Cache-Control': 'no-store' })
}
