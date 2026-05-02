import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  test('renders with default variant', () => {
    const html = renderToStaticMarkup(<Badge>Label</Badge>)
    expect(html).toMatchSnapshot()
  })

  test('renders with secondary variant', () => {
    const html = renderToStaticMarkup(<Badge variant="secondary">Secondary</Badge>)
    expect(html).toMatchSnapshot()
  })

  test('renders with destructive variant', () => {
    const html = renderToStaticMarkup(<Badge variant="destructive">Danger</Badge>)
    expect(html).toMatchSnapshot()
  })

  test('renders with outline variant', () => {
    const html = renderToStaticMarkup(<Badge variant="outline">Outline</Badge>)
    expect(html).toMatchSnapshot()
  })

  test('accepts custom className', () => {
    const html = renderToStaticMarkup(<Badge className="mt-2">Custom</Badge>)
    expect(html).toMatchSnapshot()
  })

  test('renders as child element via asChild', () => {
    const html = renderToStaticMarkup(<Badge asChild><a href="/tag">Tag</a></Badge>)
    expect(html).toMatchSnapshot()
  })
})
