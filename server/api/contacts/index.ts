import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const method = event.node.req.method
  const url = `${config.public.apiBase}/contacts`

  let options: any = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (method === 'POST') {
    const body = await readBody(event)
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, { method, ...options })
  return await response.json()
})
