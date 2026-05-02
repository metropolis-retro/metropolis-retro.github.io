import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  test('renders with default (horizontal) orientation', () => {
    const html = renderToStaticMarkup(<Separator />)
    expect(html).toMatchSnapshot()
  })

  test('renders with vertical orientation', () => {
    const html = renderToStaticMarkup(<Separator orientation="vertical" />)
    expect(html).toMatchSnapshot()
  })

  test('renders as non-decorative', () => {
    const html = renderToStaticMarkup(<Separator decorative={false} />)
    expect(html).toMatchSnapshot()
  })

  test('accepts custom className', () => {
    const html = renderToStaticMarkup(<Separator className="my-4" />)
    expect(html).toMatchSnapshot()
  })
})
