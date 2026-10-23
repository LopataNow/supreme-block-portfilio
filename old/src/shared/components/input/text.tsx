import React from 'react';
import styles from './text.module.scss';

interface TextProps {
    name: string;
    placeholder?: string;
    disabled?: boolean;
}

function Text({name, disabled}: TextProps){
	return(
		<input disabled={disabled} className={styles['input-text']} type='text' name={name} placeholder={name} />
	);
}

export default Text;