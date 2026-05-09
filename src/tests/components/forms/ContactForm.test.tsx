import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => ({ children, initial, animate, transition, ...props }: any) =>
      React.createElement(tag, props, children),
  }),
}))

import ContactForm from '@/components/forms/ContactForm'

const fillForm = async (user: ReturnType<typeof userEvent.setup>, overrides: Record<string, string> = {}) => {
  const values = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Booking Request',
    message: 'This is a detailed message that meets the minimum character requirement.',
    ...overrides,
  }
  await user.type(screen.getByPlaceholderText('Your Name'), values.name)
  await user.type(screen.getByPlaceholderText('Email Address'), values.email)
  await user.type(screen.getByPlaceholderText('Subject'), values.subject)
  await user.type(screen.getByPlaceholderText('Your Message'), values.message)
}

describe('ContactForm', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    render(<ContactForm />)
    await user.type(screen.getByPlaceholderText('Your Name'), 'Valid Name')
    await user.type(screen.getByPlaceholderText('Email Address'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText('Valid email required')).toBeInTheDocument()
    })
  })

  it('shows message length validation error', async () => {
    render(<ContactForm />)
    await fillForm(user, { message: 'Too short' })
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 20 characters/i)).toBeInTheDocument()
    })
  })

  it('shows loading state while submitting', async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument()
    })
  })

  it('shows success message after successful submission', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => ({ ok: true }) } as Response)
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
  })

  it('clears form fields after successful submission', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => ({ ok: true }) } as Response)
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Your Name')).toHaveValue('')
    })
  })

  it('shows error message when submission fails', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false } as Response)
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('disables submit button while loading', async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    })
  })

  it('sends correct payload to /api/contact', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => ({ ok: true }) } as Response)
    render(<ContactForm />)
    await fillForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Jane Smith'),
      }))
    })
  })
})
