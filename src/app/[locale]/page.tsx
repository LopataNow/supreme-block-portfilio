import Particles from '@/shared/components/graphics/particles';
import { useTranslations } from 'next-intl';

export default function HomePage() {
	const t = useTranslations('HomePage');
	return (
		<>
			<Particles>
				{t('title')}
			</Particles>
		</>
	);
}