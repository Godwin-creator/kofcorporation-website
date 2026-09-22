import { Resend } from 'resend'

export const getResend = () => {
	const apiKey = process.env.RESEND_API_KEY

	if (!apiKey) {
		throw new Error('RESEND_API_KEY is not configured')
	}

	return new Resend(apiKey)
}
