import { describe, expect, test } from 'bun:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Badge } from '@/components/ui/badge'

describe('Badge snapshots', () => {
  test('default variant', () => {
    expect(renderToStaticMarkup(<Badge>Default</Badge>)).toMatchSnapshot()
  })

  test('secondary variant', () => {
    expect(renderToStaticMarkup(<Badge variant="secondary">Secondary</Badge>)).toMatchSnapshot()
  })

  test('destructive variant', () => {
    expect(renderToStaticMarkup(<Badge variant="destructive">Error</Badge>)).toMatchSnapshot()
  })

  test('outline variant', () => {
    expect(renderToStaticMarkup(<Badge variant="outline">Outline</Badge>)).toMatchSnapshot()
  })

  test('with custom className', () => {
    expect(renderToStaticMarkup(<Badge className="extra-class">Custom</Badge>)).toMatchSnapshot()
  })
})
