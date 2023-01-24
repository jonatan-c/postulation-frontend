/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import clientAxios from '../../api';
import { AppThunk, RootState } from '../store';
import tokenAuth from '../../api/tokenAuth';
import { IResCheckLogin, IResLogin } from '@/interfaces/auth';
import Cookies from 'js-cookie';

export interface IResCheckAuthGet {
	id_user: number;
	name: string;
	email: string;
	state: string;
}

// Define a type for the slice state
interface IAuthentication {
	loading: boolean;
	error: Error | null;
	user: string;
}

// Define the initial state using that type
const initialState: IAuthentication = {
	loading: false,
	error: null,
	user: '',
};

export const authenticationSlice = createSlice({
	name: 'authentication',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		registerUser: (state, action: PayloadAction<any>) => {
			return {
				...state,
				loading: false,
				error: null,
			};
		},
		loginUser: (state, action: PayloadAction<any>) => {
			return {
				...state,
				loading: false,
				error: null,
				user: action.payload,
			};
		},
		isLoginCheck: (state, action: PayloadAction<any>) => {
			return {
				...state,
				loading: false,
				error: null,
				user: action.payload,
			};
		},
	},
});

export const register = (body: any): AppThunk => {
	return async (dispatch) => {
		const response = await clientAxios.post('/user', body);
		try {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Usuario registrado con exito',
				showConfirmButton: false,
				timer: 1500,
			});
			dispatch(registerUser(body));
		} catch (error) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				// title: response.data.error,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
};

export const login = (body: any): AppThunk => {
	return async (dispatch) => {
		const response = await clientAxios.post<IResLogin>('/auth/login', body);
		try {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Usuario logueado con exito',
				showConfirmButton: false,
				timer: 1500,
			});
			dispatch(loginUser(response.data.data.user.name));
			// localStorage.setItem('token', response.data.data.accessToken)
			Cookies.set('token', response.data.data.accessToken);

			// cookies
		} catch (error) {
			// dispatch(fetchTodosError(error as Error));
			console.log(error);

			Swal.fire({
				position: 'center',
				icon: 'error',

				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
};

export const checkAuth = (): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.get<IResCheckLogin>('/auth/profile');
			dispatch(isLoginCheck(response.data.user.name));
		} catch (error) {
			console.log(error);
		}
	};
};

export const logout = (): AppThunk => {
	return async (dispatch) => {
		Cookies.remove('token');
		dispatch(isLoginCheck(''));
	};
};

export const { registerUser, isLoginCheck, loginUser } =
	authenticationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState): any => state.authentication;

export default authenticationSlice.reducer;
