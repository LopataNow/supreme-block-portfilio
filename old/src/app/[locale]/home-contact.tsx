import { useTranslations } from 'next-intl';
import styles from './home.module.scss';
import InViewFade from '@/shared/components/in-view-fade';
import {Text, TextArea} from '@/shared/components/input';

// eslint-disable-next-line no-unused-vars
function ContackForm(){
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
				<InViewFade>
					<h2>Contact</h2>
					<p className={styles['home-contact-email']}>peter.kopac3@gmail.com</p>
				</InViewFade>
			</div>
		</>
	);
}