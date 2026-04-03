import { describe, expect, test } from 'bun:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card snapshots', () => {
  test('bare Card', () => {
    expect(renderToStaticMarkup(<Card />)).toMatchSnapshot()
  })

  test('Card with all sub-components', () => {
    const html = renderToStaticMarkup(
      <Card>
        <CardHeader>
          <CardTitle>Tournament Results</CardTitle>
          <CardDescription>Saturday Rapid Arena — Round 5</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Main content goes here.</CardContent>
        <CardFooter>Footer info</CardFooter>
      </Card>,
    )
    expect(html).toMatchSnapshot()
  })

  test('CardHeader snapshot', () => {
    expect(renderToStaticMarkup(<CardHeader><CardTitle>Title</CardTitle></CardHeader>)).toMatchSnapshot()
  })

  test('CardContent snapshot', () => {
    expect(renderToStaticMarkup(<CardContent>Body text</CardContent>)).toMatchSnapshot()
  })

  test('CardFooter snapshot', () => {
    expect(renderToStaticMarkup(<CardFooter>Footer</CardFooter>)).toMatchSnapshot()
  })
})
