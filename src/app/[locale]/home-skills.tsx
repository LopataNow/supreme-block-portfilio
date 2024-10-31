import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';

export default function HomeSkills() {
	const t = useTranslations('HomePage');
	return (
		<>
			<div className={styles['home-skills']}>
				<InViewFade><h2>Skills</h2></InViewFade>

				<InViewFade>
					<h3>Programing Language:</h3>
					<p>C#, JavaScript, Typescript</p>
				</InViewFade>

				<InViewFade>
					<h3>Front-End:</h3>
					<p>React, Angular, Regux, Rxjs, HTML, CSS/SCSS, Styled compoment</p>
				</InViewFade>

				<InViewFade>
					<h3>Back-End:</h3>
					<p>Nodejs, ASP:NET Core, Entity Framework, PostgreSQL, MogoDB, Firebase</p>
				</InViewFade>

				<InViewFade>
					<h3>Game development:</h3>
					<p>Unity 3D, Blender, Shaders, Game Design, GameAI</p>
				</InViewFade>
			</div>
		</>
	);
}