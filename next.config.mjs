import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		implementation: 'sass-embedded',
	},
};

export default withNextIntl(nextConfig);