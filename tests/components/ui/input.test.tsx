import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  test('renders with default props', () => {
    const html = renderToStaticMarkup(<Input />)
    expect(html).toMatchSnapshot()
  })

  test('renders with type="text"', () => {
    const html = renderToStaticMarkup(<Input type="text" placeholder="Enter text" />)
    expect(html).toMatchSnapshot()
  })

  test('renders with type="email"', () => {
    const html = renderToStaticMarkup(<Input type="email" placeholder="email@example.com" />)
    expect(html).toMatchSnapshot()
  })

  test('renders with type="password"', () => {
    const html = renderToStaticMarkup(<Input type="password" placeholder="Password" />)
    expect(html).toMatchSnapshot()
  })

  test('renders as disabled', () => {
    const html = renderToStaticMarkup(<Input disabled placeholder="Disabled" />)
    expect(html).toMatchSnapshot()
  })

  test('renders with aria-invalid', () => {
    const html = renderToStaticMarkup(<Input aria-invalid="true" />)
    expect(html).toMatchSnapshot()
  })

  test('accepts custom className', () => {
    const html = renderToStaticMarkup(<Input className="w-full" />)
    expect(html).toMatchSnapshot()
  })
})
