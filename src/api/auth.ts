/* eslint-disable @typescript-eslint/no-explicit-any */
import callApi from "./config"

const REGISTER = 'auth/register'

const LOGIN = 'auth/login'

const USER = 'user'

export const registerUser = (payload: any) => callApi(REGISTER, 'POST', payload)

export const doLogin = (payload: any) => callApi(LOGIN, 'POST', payload)

export const createUser = (payload: any) => callApi(USER, 'POST', payload)

export const getUser = () => callApi(USER, 'GET')

export const getSingleUser = (id: any) => callApi(`${USER}/${id}`, 'GET')

export const updateSingleUser = (id: any) => callApi(`${USER}/${id}`, 'PUT')

export const deleteSingleUser = (id: any) => callApi(`${USER}/${id}`, 'DELETE')
