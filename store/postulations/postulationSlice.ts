/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import clientAxios from '../../api';
import { AppThunk, RootState } from '../store';
import tokenAuth from '../../api/tokenAuth';
import { IResCheckLogin, IResLogin } from '@/interfaces/auth';
import { useRouter } from 'next/router';
import {
	IPostulations,
	IResGetPostulationByID,
	IResponseCreatePostulation,
	IResPostulations,
} from '@/interfaces/postulation';
import Cookies from 'js-cookie';

// Define the initial state using that type
const initialState: IResPostulations = {
	data: [],
	meta: {
		page: 1,
		take: 0,
		itemCount: 0,
		pageCount: 0,
		hasPreviousPage: false,
		hasNextPage: false,
	},
	selected: {
		id: 0,
		dateSend: '',
		feedback: false,
		dateFeedback: '',
		company: '',
		createdAt: '',
		updatedAt: '',
		images: [],
		description: '',
	},
	lastId: 0,
};

export const postulationSlice = createSlice({
	name: 'postulation',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		getAll: (state, action: PayloadAction<any>) => {
			return {
				...state,
				data: action.payload.data,
				meta: {
					page: action.payload.meta.page,
					take: action.payload.meta.take,
					itemCount: action.payload.meta.itemCount,
					pageCount: action.payload.meta.pageCount,
					hasPreviousPage: action.payload.meta.hasPreviousPage,
					hasNextPage: action.payload.meta.hasNextPage,
				},
			};
		},
		createPostulationState: (state, action: PayloadAction<any>) => {
			return {
				...state,
				data: [...state.data, action.payload.data],
				lastId: action.payload.id,
			};
		},

		getOneById: (state, action: PayloadAction<any>) => {
			return {
				...state,
				selected: action.payload,
			};
		},
		deleteIamge: (state, action: PayloadAction<any>) => {
			return {
				...state,
				selected: {
					...state.selected,
					images: state.selected.images.filter(
						(image) => image.id !== action.payload
					),
				},
			};
		},
		editPostulationByID: (state, action: PayloadAction<any>) => {
			return {
				...state,
				selected: {
					...state.selected,
					// description: action.payload.description,
					images: action.payload.images,
				},
			};
		},
		cleanSelected: (state) => {
			return {
				...state,
				selected: {
					id: 0,
					dateSend: '',
					feedback: false,
					dateFeedback: '',
					company: '',
					createdAt: '',
					updatedAt: '',
					images: [],
					description: '',
				},
			};
		},
	},
});

export const getAllPostulations = (take: any, page: any): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.get<IResPostulations>(
				`/postulation?take=${take}&page=${page}`
			);

			dispatch(getAll(response.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const createPostulation = (data: any): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.post<IResponseCreatePostulation>(
				`/postulation`,
				data
			);

			console.log(response.data);

			dispatch(createPostulationState(response.data.postulationCreated));
			Swal.fire({
				icon: 'success',
				title: 'Postulación creada',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const getPostulationById = (id: any): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.get<IResGetPostulationByID>(
				`/postulation/${id}`
			);

			dispatch(getOneById(response.data.postulationSelected));
		} catch (error) {
			console.log(error);
		}
	};
};

export const createImageToPostulation = (
	idPostulation: number,
	data: any
): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.post<any>(
				`/image-description/${idPostulation}/image`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteImageToPostulation = (idImage: number): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.delete<any>(
				`/image-description/${idImage}`
			);

			dispatch(deleteIamge(idImage));
		} catch (error) {
			console.log(error);
		}
	};
};

export const editPostulation = (id: any, data: any): AppThunk => {
	return async (dispatch) => {
		const token = Cookies.get('token');
		if (token) {
			tokenAuth(token);
		} else {
			return;
		}

		try {
			const response = await clientAxios.put<IResponseCreatePostulation>(
				`/postulation/${id}`,
				data
			);

			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
};

export const cleanSelectedPostulation = (): any => {
	return (dispatch: any) => {
		dispatch(cleanSelected());
	};
};

export const {
	getAll,
	createPostulationState,
	getOneById,
	deleteIamge,
	editPostulationByID,
	cleanSelected,
} = postulationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState): any => state.postulation;

export default postulationSlice.reducer;
