import React, { Suspense } from 'react';
import Particles from '@/shared/components/graphics/particles';
import { useTranslations } from 'next-intl';
import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from '@storyblok/react';

import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';

let slug = "home";

let sbParams: ISbStoriesParams = {
	version: "draft", // or 'published'
};
const storyblokApi = getStoryblokApi();

async function Data() {
	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
	return <StoryblokComponent blok={data.story.content} />;
}

const data = Data();

export default function HomePage() {
	const t = useTranslations('HomePage');
	return (
		<>
			<div className={styles['home-hero']}>
				<Particles />
			</div>
			<div className={styles['home-content']}>
				<InViewFade>
					content
				</InViewFade>
			</div>
		</>
	);
}