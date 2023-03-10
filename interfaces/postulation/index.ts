// Generated by https://quicktype.io

// Generated by https://quicktype.io

export interface IResPostulations {
	data: Datum[];
	meta: Meta;
	selected: PostulationSelected;
	lastId: number;
}

export interface Datum {
	id: number;
	dateSend: string;
	feedback: boolean;
	dateFeedback: string;
	company: string;
	createdAt: string;
	updatedAt: string;
	description?: string;
}

export interface Meta {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface IPostulation {
	id: number;
	dateSend: string;
	feedback: boolean;
	dateFeedback: string;
	company: string;
	createdAt: string;
	updatedAt: string;
	description?: string;
}

export interface IPostulations {
	postulations: IPostulation[];
}

// Generated by https://quicktype.io

export interface IResponseCreatePostulation {
	message: string;
	postulationCreated: PostulationCreated;
}

export interface PostulationCreated {
	dateSend: string;
	feedback: boolean;
	dateFeedback: string;
	company: string;
	userId?: number;
	id: number;
	createdAt: string;
	updatedAt: string;
	description?: string;
}

// Generated by https://quicktype.io

export interface IResGetPostulationByID {
	message: string;
	postulationSelected: PostulationSelected;
}

export interface PostulationSelected {
	id: number;
	dateSend: string;
	feedback: boolean;
	dateFeedback: string;
	company: string;
	createdAt: string;
	updatedAt: string;
	images: Image[];
	description?: string;
}

export interface Image {
	id: number;
	fileName: string;
	descriptionFile: string;
	fileUrl: string;
	key: string;
	createdAt: string;
	updatedAt: string;
}
