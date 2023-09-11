export interface LoginRequest {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
}