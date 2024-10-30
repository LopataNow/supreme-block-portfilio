import React from 'react';
import { useTranslations } from 'next-intl';

export default function HomeSkills() {
	const t = useTranslations('HomePage');
	return (
		<>
			<div>
				Skills
			</div>
		</>
	);
}