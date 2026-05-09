import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockSend = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: mockSend } }
  }),
}))

const makeRequest = (body: unknown) =>
  new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Booking Enquiry',
  message: 'This is a test message that meets the minimum length.',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mockSend.mockReset()
    mockSend.mockResolvedValue({ id: 'email-id-123' })
  })

  it('returns 200 and ok:true for valid data', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validBody))
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.ok).toBe(true)
  })

  it('calls resend.emails.send with correct fields', async () => {
    const { POST } = await import('@/app/api/contact/route')
    await POST(makeRequest(validBody))

    expect(mockSend).toHaveBeenCalledOnce()
    const call = mockSend.mock.calls[0][0]
    expect(call.subject).toBe('[Portfolio] Booking Enquiry')
    expect(call.replyTo).toBe('test@example.com')
    expect(call.text).toContain('Test User')
    expect(call.text).toContain('This is a test message')
  })

  it('returns 500 when name is too short', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest({ ...validBody, name: 'X' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when email is invalid', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest({ ...validBody, email: 'not-an-email' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when message is under 20 characters', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest({ ...validBody, message: 'Too short' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when required fields are missing', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest({ name: 'Only Name' }))
    expect(res.status).toBe(500)
  })

  it('returns 500 when resend throws', async () => {
    mockSend.mockRejectedValue(new Error('Resend API error'))
    const { POST } = await import('@/app/api/contact/route')
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(500)
  })
})
