/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8)
		.max(32)
		.required()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
		),
});
