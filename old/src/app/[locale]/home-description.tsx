import InViewFade from '@/shared/components/in-view-fade';
import styles from './home.module.scss';

export function HomeDescription(){
	return(
		<InViewFade className={styles['home-contact-description']}>
			<p>
            I'm a Front-End Developer specializing in React, with experience in Angular, .NET, Node.js, and Unity 3D. 
            I excel in analytical and creative thinking, algorithms, data structures, and design patterns. 
            I ensure quick adaptation to new technologies and a focus on clean, optimized code.
			</p>
		</InViewFade>
	);
}