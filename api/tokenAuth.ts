import clienteAxios from './index';

const tokenAuth = (token: any): any => {
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (token) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		clienteAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete clienteAxios.defaults.headers.common.Authorization;
	}
};

export default tokenAuth;
