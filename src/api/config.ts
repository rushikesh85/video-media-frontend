/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from '@/constants/api';
import { getToken } from '@/helpers/cookiesManager';

type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
const HEADERS = { 'Content-Type': 'application/json' }

export const BASE_API_URL = BASE_URL

export const getParams = (params: any) => {
    if (!!params && typeof params === 'object' && params !== null) {
        return `?${Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&')}`
    }
    return ''
}

const callApi = (url: string, method: METHOD, body: any = null, queryParams: any = null, header: any = {}) => {
    const token = getToken(url)
    const newUrl = queryParams ? `${BASE_API_URL}${url}${getParams(queryParams)}` : `${BASE_API_URL}${url}`

    const options: any = {
        method,
        headers: {
            ...HEADERS,
            Authorization: `Bearer ${token}`,
            ...header,
        },
    }

    if (body) {
        options.body = JSON.stringify(body)
    }
    return fetch(newUrl, options).then(
        (response) => response.json(),

        (err) => console.log(err)
    )
}

export const downloadFileInBrowser = (url: string) => {
    fetch(url, { method: 'GET' }).then(() => {
        const link = document.createElement('a')
        link.href = url
        link.click()
    })
}

export const uploadImageApiCall = async (url: string, formData: any) => {
    const token = getToken(url)
    const data = await fetch(`${BASE_API_URL}${url}`, {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: formData,
    })
    return await data.json()
}

export default callApi
