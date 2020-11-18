import * as types from './actionTypes';
import axios from 'axios';

export function loginRequest(id, pw) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());
        var loginData = {id:id, pw:pw}
        // API REQUEST
        return axios.post('http://localhost:4000/api/login', { loginData })
        .then((response) => {
            // SUCCEED
            console.log(response)
            dispatch(loginSuccess(id));
        }).catch((error) => {
            // FAILED
            dispatch(loginFail());
        });
    };
}

export function login(){
    return {
        type:types.LOGIN
    };
}

export function loginSuccess(id) {
    return {
        type : types.LOGIN_SUCCESS,
        id
    };
}

export function loginFail() {
    return {
        type : types.LOGIN_FAIL
    };
}

///////////////////////////////////////////////////////
// login check
export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return axios.get('http://localhost:4000/api/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.id));
        }).catch((error) => {
            dispatch(getStatusFailure());
        })
    }
}

export function getStatus() {
    return {
        type: types.AUTH_GET_STATUS
    };
}
 
export function getStatusSuccess(id) {
    return {
        type: types.AUTH_GET_STATUS_SUCCESS,
        id
    };
}
 
export function getStatusFailure() {
    return {
        type: types.AUTH_GET_STATUS_FAILURE
    };
}
//////////////////////////////
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('http://localhost:4000/api/logout')
        .then((response) => {
            if(response.data.sucess) {
                dispatch(logout());
            }
        });
    };
}
export function logout() {
    return {
        type: types.LOGOUT
    };
}
/////////////////////////////// 아이디 중복체크
export function idCheckRequest(id) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(idCheck());
        var loginData = {id:id}
        return axios.post('http://localhost:4000/api/idCheck', { loginData })
        .then((response) => {
            dispatch(idCheckSuccess());
        }).catch((error) => {
            dispatch(idCheckFailure());
        });
    };
}
 
export function idCheck() {
    return {
        type: types.AUTH_IDCHECK
    };
}
export function idCheckSuccess() {
    return {
        type: types.AUTH_IDCHECK_SUCCESS
    };
}
 
export function idCheckFailure(error) {
    return {
        type: types.AUTH_IDCHECK_FAILURE
    };
}

///////////////////////////////
//가입
export function registerRequest(id, pw) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());
 
        return axios.post('http://localhost:4000/api/signup', { id, pw })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register() {
    return {
        type: types.AUTH_REGISTER
    };
}
 
export function registerSuccess() {
    return {
        type: types.AUTH_REGISTER_SUCCESS,
    };
}
 
export function registerFailure(error) {
    return {
        type: types.AUTH_REGISTER_FAILURE,
        error
    };
}
///////////////////////// 모달 띄우기
export function hideModal() {
    return {
        type: types.HIDE_MODAL
    };
}
export function showModal() {
    return {
        type: types.SHOW_MODAL
    };
}

export function registerHideModal() {
    return {
        type: types.REGISTER_HIDE_MODAL
    };
}
export function registerShowModal() {
    return {
        type: types.REGISTER_SHOW_MODAL
    };
}