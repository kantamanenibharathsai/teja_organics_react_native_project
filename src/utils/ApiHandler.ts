import store from '../redux/store';
// import { baseURL } from './constants';
export const baseURL = 'http://122.175.39.120:4002/';

type IResponseType = 'json' | 'text' | 'blob';

type IResolve = {
    response: any;
    statusCode: number | null;
    error: string | unknown | null;
    errorDetails: unknown | null;
};

type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const resolve = async (
    promise: () => Promise<{ response: any; statusCode: number } | unknown>,
) => {
    const resolved: IResolve = {
        response: null,
        error: null,
        statusCode: null,
        errorDetails: null,
    };
    try {
        const result = await promise();
        if (
            result &&
            typeof result === 'object' &&
            'response' in result &&
            'statusCode' in result
        ) {
            const { response, statusCode, error } = result as {
                response: any;
                error: any;
                statusCode: number;
            };
            resolved.response = response;
            resolved.statusCode = statusCode;
            resolved.error = error;
        } else {
            // eslint-disable-next-line
            throw {
                statusCode: (result as any)?.statusCode,
                errorDetails: (result as any)?.error,
            };
        }
    } catch (error: any) {
        resolved.error = 'Something went wrong...';
        resolved.errorDetails = error;
        if (error instanceof Response) {
            resolved.statusCode = error.status;
        }
        if (error?.errorDetails) {
            resolved.errorDetails = error?.errorDetails;
        }
        if (error?.statusCode) {
            resolved.statusCode = error?.statusCode;
        }
    }

    return resolved;
};

const ApiHandler = async (
    url: string,
    method: IMethod = 'GET',
    body?: BodyInit_,
    headers?: Record<string, string> | null,
    responseType: IResponseType = 'json',
) => {
    const makeCall = async () => {
        try {
            let statusCode: number | null = null;
            const token = store.getState()?.AuthSlice.user?.token;
            let defaultHeaders = {
                'Content-Type':
                    body instanceof FormData ? 'multipart/form-data' : 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...headers,
            };
            if (defaultHeaders && defaultHeaders['Content-Type'] === 'null') {
                delete (defaultHeaders as { [key: string]: string })['Content-Type'];
            }

            const fullUrl = /(http(s?)):\/\//i.test(url) ? url : baseURL + '/' + url;
            const response = await fetch(fullUrl, {
                method,
                headers: defaultHeaders,
                ...(body && { body }),
            });
            statusCode = response.status;
            const responseData = await response[responseType]();
            return {
                response: responseData,
                statusCode,
            };
        } catch (error) {
            return { error };
        }
    };
    return await resolve(makeCall);
};

export default ApiHandler;