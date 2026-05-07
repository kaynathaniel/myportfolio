'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-transparent border-b border-[#1e1e1e] py-3 text-[#f0ede8] text-sm placeholder:text-[#444444] focus:outline-none focus:border-[#c9a84c] transition-colors'

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8 w-full"
    >
      <div>
        <input {...register('name')} placeholder="Your Name" className={inputClass} />
        {errors.name && <p className="mt-1 text-[#c9a84c] text-xs">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} type="email" placeholder="Email Address" className={inputClass} />
        {errors.email && <p className="mt-1 text-[#c9a84c] text-xs">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register('subject')} placeholder="Subject" className={inputClass} />
        {errors.subject && <p className="mt-1 text-[#c9a84c] text-xs">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea {...register('message')} placeholder="Your Message" rows={5} className={`${inputClass} resize-none`} />
        {errors.message && <p className="mt-1 text-[#c9a84c] text-xs">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start px-10 py-4 bg-[#c9a84c] text-[#080808] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#f0ede8] disabled:opacity-50 transition-colors duration-300"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-[#c9a84c] text-xs tracking-widest uppercase">Message sent. I&apos;ll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs tracking-widest uppercase">Something went wrong. Please try again.</p>
      )}
    </motion.form>
  )
}
