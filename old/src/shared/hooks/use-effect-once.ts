import { EffectCallback, useEffect, useRef } from "react";

export default function useEffectOnce(effect: EffectCallback) {
	const ref = useRef(null);

	useEffect(()=>{
		return effect();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);
}