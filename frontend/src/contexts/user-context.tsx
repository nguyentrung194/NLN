export interface UserState {
    user_id?: any;
    logs?: any[];
    setLogs?: any;
    isLogin: boolean;
    name: string;
    email: string;
    time: any;
    images: any[];
    takePiture?: any;
    login?: any;
    register?: any;
    logout?: any;
}

export const UserReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case "LOGS":
            return {
                ...state,
                logs: action.payload.logs,
            };
        case "TAKE_PITURE":
            return {
                ...state,
                images: [...state.images, action.payload.image],
            };
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                name: action.payload.name,
                email: action.payload.email,
                user_id: action.payload.user_id,
                time: new Date(),
            };
        case "REGISTER":
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                images: action.payload.images,
            };
        case "LOGOUT":
            return {
                images: [],
                isLogin: false,
                name: '',
                email: '',
                time: null,
                user_id: "",
            };
        default:
            return state;
    }
};