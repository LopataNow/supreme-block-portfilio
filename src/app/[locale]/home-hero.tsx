import Particles from '@/shared/components/graphics/particles';
import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';

export function HomeHero(){
	return (
		<div className={styles['home-hero']}>
			<Particles>
				<div className={styles['home-hero-content']}>
					<div>
						<InViewFade>
							<h1>Peter Kopáč</h1>
							<h2>I&apos;m a professional <br />Software Developer</h2>
							<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h3>
						</InViewFade>
					</div>
				</div>
			</Particles>
		</div>
	);
}