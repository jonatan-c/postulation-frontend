// Generated by https://quicktype.io

export interface IResLogin {
	message: string;
	data: Data;
}

export interface Data {
	user: User;
	accessToken: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
}

// Generated by https://quicktype.io

export interface IResCheckLogin {
	message: string;
	user: User;
}
