import {revalidateTag} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

const tagMap: Record<string, string> = {
  stat: 'stats',
  project: 'projects',
  testimonial: 'testimonials',
  partner: 'partners',
  service: 'services',
  companySettings: 'settings',
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SANITY_WEBHOOK_SECRET
  const receivedSecret = request.headers.get('x-webhook-secret')

  if (!configuredSecret || !receivedSecret || receivedSecret !== configuredSecret) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  let body: { _type?: string }
  try {
    body = await request.json() as { _type?: string }
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
  }

  const tag = body._type ? tagMap[body._type] : undefined
  if (tag) {
    revalidateTag(tag, 'max')
  }

  return NextResponse.json({revalidated: Boolean(tag), tag: tag ?? null})
}