import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  test('renders with default variant and size', () => {
    const html = renderToStaticMarkup(<Button>Click me</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with destructive variant', () => {
    const html = renderToStaticMarkup(<Button variant="destructive">Delete</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with outline variant', () => {
    const html = renderToStaticMarkup(<Button variant="outline">Outline</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with secondary variant', () => {
    const html = renderToStaticMarkup(<Button variant="secondary">Secondary</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with ghost variant', () => {
    const html = renderToStaticMarkup(<Button variant="ghost">Ghost</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with link variant', () => {
    const html = renderToStaticMarkup(<Button variant="link">Link</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with sm size', () => {
    const html = renderToStaticMarkup(<Button size="sm">Small</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with lg size', () => {
    const html = renderToStaticMarkup(<Button size="lg">Large</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders with icon size', () => {
    const html = renderToStaticMarkup(<Button size="icon" aria-label="Add">+</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders as disabled', () => {
    const html = renderToStaticMarkup(<Button disabled>Disabled</Button>)
    expect(html).toMatchSnapshot()
  })

  test('renders as child element via asChild', () => {
    const html = renderToStaticMarkup(<Button asChild><a href="/page">Go</a></Button>)
    expect(html).toMatchSnapshot()
  })
})
