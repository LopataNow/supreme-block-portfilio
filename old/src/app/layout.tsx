import React from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import Feature from '@/storybook-compoment/Feature';
import Grid from '@/storybook-compoment/Grid';
import Teaser from '@/storybook-compoment/Teaser';
import Page from '@/storybook-compoment/Page';
import '../styles/index.scss';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	weight: ['400', '800'],
	subsets: ['latin'],
	display: 'swap',
});

const components = {
	feature: Feature,
	grid: Grid,
	teaser: Teaser,
	page: Page,
};

storyblokInit({
	accessToken: process.env.STORYBLOCK_TOKEN,
	use: [apiPlugin],
	components,
	apiOptions: {
		region: ''
	}
});

export default async function LocaleLayout({
	children,
	params: {locale}
}: {
	children: React.ReactNode;
	params: {locale: string};
}) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();
 
	return (
		<html lang={locale} className={poppins.className}>
			<body>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}