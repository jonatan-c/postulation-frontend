import * as yup from 'yup';

export const schema = yup.object().shape({
	company: yup.string().required(),
	dateSend: yup.string().required(),
	// position : yup.string().required(),
	dateFeedback: yup.string(),
	feedback: yup.boolean().default(false),
	description: yup.string(),
});
