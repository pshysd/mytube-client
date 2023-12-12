import { ChangeEvent, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLSelectElement>) => void, React.Dispatch<SetStateAction<T>>];

const useSelect = <T>(initialState: T): ReturnTypes<T> => {
	const [state, setState] = useState(initialState);

	const stateHandler = useCallback((e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
		setState(e.target.value as unknown as T);
	}, []);

	return [state, stateHandler, setState];
};

export default useSelect;
