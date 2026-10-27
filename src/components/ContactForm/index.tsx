'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  locale?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ locale = 'sk' }) => {
  const isSk = locale === 'sk'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    // Honeypot field (hidden from humans, filled by bots)
    companyWebsiteUrl: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Bot detection via honeypot field
    if (formData.companyWebsiteUrl) {
      // Silently pretend success to deceive spam bots
      setStatus('success')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          status: 'unread',
        }),
      })

      if (!response.ok) {
        throw new Error(isSk ? 'Odoslanie zlyhalo. Skúste to prosím znova.' : 'Failed to send message. Please try again.')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        message: '',
        companyWebsiteUrl: '',
      })
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err?.message || (isSk ? 'Nastala neočakávaná chyba.' : 'An unexpected error occurred.'))
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md shadow-xl text-left">
      {status === 'success' ? (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-4 animate-in zoom-in-75 duration-300" />
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {isSk ? 'Správa bola úspešne odoslaná!' : 'Message Sent Successfully!'}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            {isSk
              ? 'Ďakujem za kontaktovanie. Čoskoro sa vám ozvem.'
              : 'Thank you for reaching out. I will get back to you shortly.'}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 px-5 py-2 text-xs font-semibold rounded-xl border border-border/80 hover:bg-muted text-foreground transition-colors"
          >
            {isSk ? 'Poslať ďalšiu správu' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot hidden input for anti-spam */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="companyWebsiteUrl">Leave this empty</label>
            <input
              type="text"
              id="companyWebsiteUrl"
              name="companyWebsiteUrl"
              value={formData.companyWebsiteUrl}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
              {isSk ? 'Vaše Meno *' : 'Your Name *'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={isSk ? 'Ján Novák' : 'John Doe'}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
              {isSk ? 'Váš Email *' : 'Your Email *'}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
              {isSk ? 'Správa *' : 'Message *'}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder={
                isSk
                  ? 'Napíšte stručne o vašom projekte alebo otázke...'
                  : 'Tell me briefly about your project or inquiry...'
              }
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all text-sm resize-y"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all shadow-md"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isSk ? 'Odosielam...' : 'Sending...'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{isSk ? 'Odoslať správu' : 'Send Message'}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactForm
