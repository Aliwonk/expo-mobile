export interface CreateUser {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    phone: string;
    password: string;
    adress: string;
    dateOfBirth: Date
}

export interface LoginUser {
    phone: string
    password: string
}

export interface UserResultFetch {
    roles: string[]
    token: string
}