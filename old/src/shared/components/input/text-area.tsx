import React from 'react';
import styles from './text-area.module.scss';

interface TextAreaProps{
    name: string;
    disabled?: boolean;
}

function TextArea({name, disabled}: TextAreaProps){
	return(<textarea disabled={disabled} className={styles['input-teaxarea']} name={name} placeholder={name} />);
}

export default TextArea;