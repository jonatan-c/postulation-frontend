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
		errorRegister: (state, action: PayloadAction<any>) => {
			return {
				...state,
				loading: false,
				error: action.payload,
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
		errorLogin: (state, action: PayloadAction<any>) => {
			return {
				...state,
				loading: false,
				error: action.payload,
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
		try {
			const response = await clientAxios.post('/user', body);
			console.log(response);

			if (response.data.status === 200) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: response.data.message,
					showConfirmButton: false,
					timer: 3000,
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: response.data.error.message,
					showConfirmButton: false,
					timer: 3000,
				});
			}
			dispatch(registerUser(body));
		} catch (error: any) {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: error.response.data.message,
				showConfirmButton: false,
				timer: 3000,
			});
			dispatch(errorRegister(error as Error));
		}
	};
};

export const login = (body: any): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await clientAxios.post<IResLogin>('/auth/login', body);
			console.log(response);

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Usuario logueado con exito',
				showConfirmButton: false,
				timer: 3000,
			});
			dispatch(loginUser(response.data.data.user.name));
			// localStorage.setItem('token', response.data.data.accessToken)
			Cookies.set('token', response.data.data.accessToken);

			// cookies
		} catch (error: any) {
			console.log(error);

			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: error.response.data.message,
				showConfirmButton: false,
				timer: 3000,
			});
			dispatch(errorLogin(error.response.data.message as Error));
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

export const {
	registerUser,
	isLoginCheck,
	loginUser,
	errorRegister,
	errorLogin,
} = authenticationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState): any => state.authentication;

export default authenticationSlice.reducer;
