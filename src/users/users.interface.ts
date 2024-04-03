export interface IUser {
    _id: string;
    name: string;
    phone: string;
    role: {
        _id: string,
        name: string
    }
    permissions?: {
        name: string;
        apiPath: string;
        method: string;
        module: string;
    }[]
}