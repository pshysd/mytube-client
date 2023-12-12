import { ChangeEvent, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, React.Dispatch<SetStateAction<T>>];

const useInput = <T>(initialState: T): ReturnTypes<T> => {
	const [state, setState] = useState(initialState);

	const stateHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setState(e.target.value as unknown as T);
	}, []);

	return [state, stateHandler, setState];
};

export default useInput;
