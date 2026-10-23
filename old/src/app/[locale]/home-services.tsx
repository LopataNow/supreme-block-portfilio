import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';

export default function HomeServices() {
	const t = useTranslations('HomePage');
	return (
		<>
			<InViewFade className={styles['home-services']}>
				<h2>Services</h2>
				<div className={styles['home-services-cards']}>
					<div className={styles['home-services-card']}>Heandless CMS or Eshop</div>
					<div className={styles['home-services-card']}>Frontend or Fullstack dev</div>
					<div className={styles['home-services-card']}>Monitoring and optimalozation</div>
					<div className={styles['home-services-card']}>Game dev</div>
					<div className={styles['home-services-card']}>AI tools implementation</div>
					<div className={styles['home-services-card']}>Custom App development</div>
				</div>
			</InViewFade>
		</>
	);
}