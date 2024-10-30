import { useTranslations } from 'next-intl';
import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from '@storyblok/react';
import styles from './home.module.scss';
import { HomeHero } from './home-hero';
import HomeSkills from './home-skills';

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
			<HomeHero />
			<div className={styles['home-content']}>
				<HomeSkills />
			</div>
		</>
	);
}