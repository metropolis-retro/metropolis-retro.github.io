import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  test('renders with text content', () => {
    const html = renderToStaticMarkup(<Label>Email address</Label>)
    expect(html).toMatchSnapshot()
  })

  test('renders with htmlFor attribute', () => {
    const html = renderToStaticMarkup(<Label htmlFor="email-input">Email</Label>)
    expect(html).toMatchSnapshot()
  })

  test('accepts custom className', () => {
    const html = renderToStaticMarkup(<Label className="text-destructive">Required *</Label>)
    expect(html).toMatchSnapshot()
  })
})
