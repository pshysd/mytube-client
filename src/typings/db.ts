interface IUser {
	_id: string;
	email: string;
	name: string;
	password: string;
	role: number;
	image: string;
	token: string;
	tokenExp: number;
}

interface ICategory {
	_id: string;
	value: number;
	label: string;
}

interface IPrivacy {
	_id: string;
	value: number;
	label: string;
}

interface IVideo {
	_id: string;
	writer: IUser;
	title: string;
	description: string;
	privacy: number;
	category: number;
	filePath: string;
	views: number;
	duration: number;
	thumbnail: string;
	createdAt: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

interface ISubscriber {
	userTo: string;
	userFrom: string;
}

interface ILike {
	userId: string;
	commentId?: string;
	videoId?: string;
}

interface IDislike {
	userId: string;
	commentId?: string;
	videoId?: string;
}

interface IComment {
	_id: string;
	writer: IUser;
	videoId: string;
	responseTo: IUser;
	content: string;
}

export type { IUser, IVideo, ISubscriber, ILike, IDislike, IComment, ICategory, IPrivacy };
