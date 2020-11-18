import * as types from '../Action/actionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUserId: ''
    },
    loginModal: {
        open: false,
        mode: true
    },
    idCheck: {
        status: 'INIT',
        idCheck: false
    }
};

export default function authentication(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN : 
            return {
                ...state,
                login : {
                    status : 'WAITING'
                }
            }
        case types.LOGIN_SUCCESS : 
            return {
                ...state,
                login : {
                    status : 'SUCCESS'
                },
                status : {
                    ...state.status,
                    isLoggedIn : true,
                    currentUserId : action.id
                }
            }
        case types.LOGIN_FAIL : 
            return {
                ...state,
                login : {
                    status : 'FAIL'
                }
            }
        case types.AUTH_GET_STATUS:
            return {
                ...state,
                status: {
                ...state.staus,
                isLoggedIn: true
                }
            }
        case types.AUTH_GET_STATUS_SUCCESS:
            return {
                ...state,
                status: {
                ...state.status,
                valid: true,
                currentUserId: action.id
                }
            }
        case types.AUTH_GET_STATUS_FAILURE:
            return {
                ...state,
                status: {
                ...state.status,
                valid: false,
                isLoggedIn: false
                }
            }
        case types.LOGOUT:
            return {
                ...state,
                status: {
                ...state.status,
                isLoggedIn: false,
                currentUserId: ''
                }
            }
        case types.AUTH_IDCHECK :
            return {
                ...state,
                idCheck: {
                    ...state.idCheck,
                    status : 'WAITING'
                }
            }
        case types.AUTH_IDCHECK_SUCCESS :
            return {
                ...state,
                idCheck: {
                    ...state.idCheck,
                    idCheck: true,
                    status : 'SUCCESS'
                }
            }
        case types.AUTH_IDCHECK_FAILURE:
            return {
                ...state,
                idCheck: {
                    ...state.idCheck,
                    idCheck: false,
                    status: 'FAILURE'
                }
            }
        case types.AUTH_REGISTER :
            return {
                ...state,
                register: {
                    status: 'WAITING',
                    error: -1
                }
            }
        case types.AUTH_REGISTER_SUCCESS :
            return {
                ...state,
                register: {
                    ...state.register,
                    status: 'SUCCESS',
                }
            }
        case types.AUTH_REGISTER_FAILURE:
            return {
                ...state,
                register:{
                    status: 'FAILURE',
                    error: action.error
                }
            }
        case types.HIDE_MODAL:
            return {
                ...state,
                loginModal: {
                    ...state.loginModal,
                    open: false
                }
            }
        case types.SHOW_MODAL:
            return {
                ...state,
                loginModal: {
                    open: true,
                    mode: true
                }
            }
        case types.REGISTER_HIDE_MODAL:
            return {
                ...state,
                loginModal: {
                    open: false,
                    mode: false
                }
            }
        case types.REGISTER_SHOW_MODAL:
            return {
                ...state,
                loginModal: {
                    open: true,
                    mode: false
                }
            }
        default :
            return state;
    }
}