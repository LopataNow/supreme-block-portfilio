import { useTranslations } from 'next-intl';
import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';
import {Text, TextArea} from '@/shared/components/input';

function ContackFrom(){
	return(
		<div className={styles['home-contact-form']}>
			<form>
				<Text name='From *'/>
				<Text name='Name *' />
				<TextArea name="The form is disabled for now, don't hesitate to contact me by my email. You can find the email in the footer." />
			</form>
		</div>
	);
}

export default function HomeContact() {
	const t = useTranslations('HomePage');
	return (
		<>
			<div className={styles['home-contact']}>
				<InViewFade><h2>Contact</h2></InViewFade>
				<ContackFrom />
			</div>
		</>
	);
}