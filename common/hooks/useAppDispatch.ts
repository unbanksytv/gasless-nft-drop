import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/redux/store';

const useAppDispatch = (): AppDispatch => useDispatch();

export default useAppDispatch;
