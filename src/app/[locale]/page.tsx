import React, { Suspense } from 'react';
import Particles from '@/shared/components/graphics/particles';
import { useTranslations } from 'next-intl';
import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from '@storyblok/react';

let slug = "home";

let sbParams: ISbStoriesParams = {
	version: "draft", // or 'published'
};
const storyblokApi = getStoryblokApi();

async function Data() {
	let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
	return <StoryblokComponent blok={data.story.content} />;
}

export default function HomePage() {
	const t = useTranslations('HomePage');
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Data />
			</Suspense>
		</>
	);
}