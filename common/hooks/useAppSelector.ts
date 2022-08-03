import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/app/redux/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
