export interface UserState {
    isLogin: boolean;
    name: string;
    username: string;
    time: any;
}

export const UserReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                name: action.payload.name,
                username: action.payload.username,
                time: new Date(),
            };
        case "REGISTER":
            return {
                ...state,
                name: action.payload.name,
                username: action.payload.username,
            };
        case "LOGOUT":
            return {
                isLogin: false,
                name: '',
                username: '',
                time: null,
            };
        default:
            return state;
    }
};