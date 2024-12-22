/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const UPDATE_PROJECT_DETAILS = 'UPDATE_PROJECT_DETAILS'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const FETCH_PROJECT_DETAILS = 'FETCH_PROJECT_DETAILS'
export const FETCH_INVOICE_DETAILS = 'FETCH_INVOICE_DETAILS'

// Action Type .......................

interface IUpdateTokenAction {
    type: typeof UPDATE_TOKEN;
    token: string;
    [key: string]: any;
}

const updateTokensAction = (token: string): IUpdateTokenAction => ({
    type: UPDATE_TOKEN,
    token,
})

interface IUpdateProjectdetailsAction {
    type: typeof UPDATE_PROJECT_DETAILS;
    payload: any;
}

interface IFetchProjectdetailsAction {
    type: typeof FETCH_PROJECT_DETAILS;
    id: number;
}
interface IFetchInvoicedetailsAction {
    type: typeof FETCH_INVOICE_DETAILS;
    id: number;
}

const updateProjectDetailsAction = (projectObj: any): IUpdateProjectdetailsAction => ({
    type: UPDATE_PROJECT_DETAILS,
    payload: projectObj,
})

const fetchProjectDetailsAction = (id: number): IFetchProjectdetailsAction => ({
    type: FETCH_PROJECT_DETAILS,
    id,
})

const fetchInvoiceDetailsAction = (id: number): IFetchInvoicedetailsAction => ({
    type: FETCH_INVOICE_DETAILS,
    id,
})

// Root Action Type
type GlobalActions =
    | IUpdateProjectdetailsAction
    | IFetchProjectdetailsAction
    | IUpdateTokenAction
    | IFetchInvoicedetailsAction;

export { updateProjectDetailsAction, fetchProjectDetailsAction, updateTokensAction, fetchInvoiceDetailsAction }

export type { GlobalActions, IFetchProjectdetailsAction }
