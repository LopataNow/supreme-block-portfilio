"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import styles from './in-view-fade.module.scss';
import React from "react";

interface InViewProps {
    children: ReactNode;
    className?: string;
}

export default function InViewFade({ children, className }: InViewProps) {
	const [isInView, setIsInView] = useState(false);

	const classNames = useMemo(() => {
		const names: string[] = [];
		if (className) {
			names.push(className);
		}
		if (isInView) {
			names.push(styles['animacion-fade-in']);
		} else {
			names.push(styles['animacion-fade-out']);
		}
		return names.join(' ');
	}, [className, isInView]);

	const registerObserver = useCallback((node: HTMLDivElement) => {
		const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting) {
				setIsInView(true);
			}
			else {
				setIsInView(false);
			}
		});
		observer.observe(node);

		return () => {
			observer.unobserve(node);
		};
	}, []);

	return (
		<span ref={registerObserver} className={classNames}>
			{children}
		</span>
	);
}