import { describe, expect, test } from 'bun:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button } from '@/components/ui/button'

describe('Button snapshots', () => {
  test('default variant', () => {
    expect(renderToStaticMarkup(<Button>Click me</Button>)).toMatchSnapshot()
  })

  test('destructive variant', () => {
    expect(renderToStaticMarkup(<Button variant="destructive">Delete</Button>)).toMatchSnapshot()
  })

  test('outline variant', () => {
    expect(renderToStaticMarkup(<Button variant="outline">Outline</Button>)).toMatchSnapshot()
  })

  test('secondary variant', () => {
    expect(renderToStaticMarkup(<Button variant="secondary">Secondary</Button>)).toMatchSnapshot()
  })

  test('ghost variant', () => {
    expect(renderToStaticMarkup(<Button variant="ghost">Ghost</Button>)).toMatchSnapshot()
  })

  test('link variant', () => {
    expect(renderToStaticMarkup(<Button variant="link">Link</Button>)).toMatchSnapshot()
  })

  test('small size', () => {
    expect(renderToStaticMarkup(<Button size="sm">Small</Button>)).toMatchSnapshot()
  })

  test('large size', () => {
    expect(renderToStaticMarkup(<Button size="lg">Large</Button>)).toMatchSnapshot()
  })

  test('disabled state', () => {
    expect(renderToStaticMarkup(<Button disabled>Disabled</Button>)).toMatchSnapshot()
  })

  test('with custom className', () => {
    expect(renderToStaticMarkup(<Button className="custom-class">Custom</Button>)).toMatchSnapshot()
  })
})
