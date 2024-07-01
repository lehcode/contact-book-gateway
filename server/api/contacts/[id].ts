import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const method = event.node.req.method
  const id = event.context.params?.id
  const url = `${config.public.apiBase}/contacts/${id}`

  let options: any = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, { method, ...options })

  if (method === 'DELETE') {
    return { success: response.ok }
  }

  return await response.json()
})
