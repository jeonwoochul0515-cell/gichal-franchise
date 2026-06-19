// 업로드 이미지 서빙 (공개) — KV에 저장된 이미지 바이트를 반환
import type { Env } from '../../_lib/auth'

export const onRequestGet = async (context: {
  params: { id: string }
  env: Env
}): Promise<Response> => {
  const id = context.params.id
  const { value, metadata } = await context.env.CONTENT.getWithMetadata(`img:${id}`, 'arrayBuffer')
  if (!value) return new Response('Not found', { status: 404 })
  const contentType = (metadata as { contentType?: string } | null)?.contentType || 'image/jpeg'
  return new Response(value, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
