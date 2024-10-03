import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { RootState } from '../store';

type ApiStatus = 'INITIAL' | 'SUCCESS' | 'ERROR' | 'LOADING';

export interface IForgotPassword {
    email: string;
    otp: string;
    apiStatus: {
        sendOtp: ApiStatus;
        verifyOtp: ApiStatus;
        changePassword: ApiStatus;
    };
}

export const sendingOtp = createAsyncThunk(
    'sendingOtp',
    async (
        emailOrmobile: string,
        { fulfillWithValue, rejectWithValue, dispatch },
    ) => {
        try {
            const response = await fetch(
                'http://122.175.39.120:8087/dadz-api/user/sendOtp',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emailOrmobile }),
                },
            );
            const data = await response.json();
            if (data.statusCode === '200') {
                dispatch(storeEmail(emailOrmobile));
                return fulfillWithValue(data);
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const verifyOtp = createAsyncThunk(
    'verifyOtpForgotPassword',
    async (
        otp: string,
        { fulfillWithValue, rejectWithValue, getState, dispatch },
    ) => {
        try {
            const emailOrmobile = (getState() as RootState).ForgotPasswordSlice.email;
            const body = JSON.stringify({ emailOrmobile, otp });
            const response = await fetch(
                'http://122.175.39.120:8087/dadz-api/user/verifyOtp/emailMobile',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body,
                },
            );
            const data = await response.json();
            if (data.statusCode === '200' || data.statusCode === 'Success') {
                dispatch(storeOtp(otp));
                return fulfillWithValue(data.message);
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const changePassword = createAsyncThunk(
    'changePassword',
    async (password: string, { fulfillWithValue, rejectWithValue, getState }) => {
        try {
            const { email, otp } = (getState() as RootState).ForgotPasswordSlice;
            const body = JSON.stringify({ email, password, otp });
            const response = await fetch(
                'http://122.175.39.120:8087/dadz-api/user/forgotpassword',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body,
                },
            );
            const data = await response.json();
            if (data.statusCode === '200' || data.statusCode === 'Success') {
                Alert.alert('Success', data.message as string);
                return fulfillWithValue(data.message);
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const initialState: IForgotPassword = {
    email: '',
    otp: '',
    apiStatus: {
        sendOtp: 'INITIAL',
        verifyOtp: 'INITIAL',
        changePassword: 'INITIAL',
    },
};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        storeEmail: (state, action: { type: unknown; payload: string }) => {
            state.email = action.payload;
        },
        storeOtp: (state, action: { type: unknown; payload: string }) => {
            state.otp = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(sendingOtp.pending, state => {
                state.apiStatus.sendOtp = 'LOADING';
            })
            .addCase(sendingOtp.fulfilled, (state, action) => {
                Alert.alert('Success', action.payload.message as string);
                state.apiStatus.sendOtp = 'SUCCESS';
            })
            .addCase(sendingOtp.rejected, (state, action) => {
                Alert.alert('Error', action.payload as string);
                state.apiStatus.sendOtp = 'ERROR';
            });
        builder
            .addCase(verifyOtp.pending, state => {
                state.apiStatus.verifyOtp = 'LOADING';
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                Alert.alert('Success', action.payload.message as string);
                state.apiStatus.verifyOtp = 'SUCCESS';
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                Alert.alert('Error', action.payload as string);
                state.apiStatus.verifyOtp = 'ERROR';
            });
        builder
            .addCase(changePassword.pending, state => {
                state.apiStatus.changePassword = 'LOADING';
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                Alert.alert('Success', action.payload as string);
                state.apiStatus.changePassword = 'SUCCESS';
            })
            .addCase(changePassword.rejected, (state, action) => {
                Alert.alert('Error', action.payload as string);
                state.apiStatus.changePassword = 'ERROR';
            });
    },
});

export const { storeEmail, storeOtp } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;