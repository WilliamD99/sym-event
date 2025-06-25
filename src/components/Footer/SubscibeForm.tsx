'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function SubscibeForm() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(email)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isValidEmail) {
            return
        }

        setIsSubmitting(true)

        // Here you would typically send the email to your newsletter service
        // For now, we'll just simulate the submission
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Reset form on success
            setEmail('')
            alert('Successfully subscribed!')
        } catch (error) {
            alert('Subscription failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 px-4 py-4 text-base font-lato tracking-wide ${email && !isValidEmail ? 'border-red-400 focus:border-red-400' : ''
                    }`}
                required
            />
            <Button
                type="submit"
                variant="outline"
                disabled={!isValidEmail || isSubmitting}
                className={`px-6 py-4 text-base font-playfair tracking-wide font-semibold border-none transition-all duration-200 ${isValidEmail && !isSubmitting
                    ? 'bg-brand text-white cursor-pointer hover:bg-brand/90 hover:text-white'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
            >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
        </form>
    )
}