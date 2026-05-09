import { describe, it, expect } from 'vitest'
import { cn, formatDate, formatYear } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'skipped', 'added')).toBe('base added')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('handles undefined and null gracefully', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })
})

describe('formatDate', () => {
  it('formats a date string to readable UK format', () => {
    const result = formatDate('2024-03-15')
    expect(result).toContain('2024')
    expect(result).toContain('March')
    expect(result).toContain('15')
  })

  it('handles different months', () => {
    expect(formatDate('2023-01-01')).toContain('January')
    expect(formatDate('2023-12-31')).toContain('December')
  })
})

describe('formatYear', () => {
  it('returns just the 4-digit year', () => {
    expect(formatYear('2024-06-01')).toBe('2024')
    expect(formatYear('2023-11-20')).toBe('2023')
  })
})
