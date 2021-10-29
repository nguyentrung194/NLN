export interface UserState {
    isLogin: boolean;
    name: string;
    email: string;
    time: any;
}

export const UserReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                name: action.payload.name,
                email: action.payload.email,
                time: new Date(),
            };
        case "REGISTER":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
            };
        case "LOGOUT":
            return {
                isLogin: false,
                name: '',
                email: '',
                time: null,
            };
        default:
            return state;
    }
};