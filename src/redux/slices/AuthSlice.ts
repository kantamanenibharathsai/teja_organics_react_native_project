

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { RootState } from '../Store';

export interface UserResponse {
    status: boolean;
    statusCode: string;
    message: string;
    data: Data;
    token: string;
    loginId: number;
    email: string;
    sidebar: Sidebar;
    isGroupMember: boolean;
    groupId: any;
    twoStepVerified: boolean;
}

type ApiStatus = 'SUCCESS' | 'ERROR' | 'LOADING' | 'INITIAL';

export interface Data {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    countryCode: any;
    commission: any;
    amountOrPercentage: any;
    organizationName: string;
    image: string;
    twoStepVerificationEnabled: boolean;
    wallet: any;
    status: any;
    screenCount: number;
    isDeleted: any;
    screenGroups: any[];
    count: number;
    investedAmount: any;
}

export interface Sidebar {
    id: number;
    sidemenu: Sidemenu[];
    path: any;
    sidebar: any;
}

export interface Sidemenu {
    id: number;
    name: string;
    path: string;
    iconImage: string;
    permission: Permission;
    submenus: any[];
    tabs: any[];
}

export interface Permission {
    moduleName: string;
    userId: number;
    create: boolean;
    update: boolean;
    view: boolean;
    delete: boolean;
}

export interface SignUpSuccessRespData {
    token: string;
}

export interface SignUpFailureRespData {
    email: string;
}

export interface IAuthSlice {
    user: UserResponse | null;
    signUpData: SignUpSuccessRespData | null;
    signUpErrMsg: SignUpFailureRespData | null;
    apiStatuses: {
        signUpUser: ApiStatus;
        verifyOtp: ApiStatus;
        signingIn: ApiStatus;
    };
}

const initialState: IAuthSlice = {
    user: null,
    signUpData: null,
    signUpErrMsg: null,
    apiStatuses: {
        signUpUser: 'INITIAL',
        verifyOtp: 'INITIAL',
        signingIn: 'INITIAL',
    },
};

export interface SingUpUser {
    email: string;
    username: string;
    password: string;
    phone: string;
    password_confirmation: string;
    role: string;
    referral_code: string;
}



export const signingUpUser = createAsyncThunk(
    'signing Up User',
    async (
        details: SingUpUser,
        { rejectWithValue, fulfillWithValue },
    ) => {

        try {
            const data1 = { user: { ...details } };
            const options = {
                method: 'POST',
                body: JSON.stringify(data1),
                headers: { 'Content-Type': "application/json" },
            };
            const response = await fetch('http://65.0.108.242/api/v1/users/', options);
            const data = await response.json();
            console.log("data", data);
            // if (data.statusCode !== '200') return rejectWithValue(data.message);
            if (data.errors) return data;
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong");
        }
    },
);

// export const verifyOtp = createAsyncThunk(
//     'verifyOtp',
//     async (otp: string, { fulfillWithValue, rejectWithValue, getState }) => {
//         try {
//             const emailOrmobile = (getState() as RootState).AuthSlice.signUpFormData
//                 ?.email;
//             const body = JSON.stringify({ emailOrmobile, otp });
//             const response = await fetch(
//                 'http://122.175.39.120:8087/dadz-api/user/verifyOtp',
//                 {
//                     method: 'POST',
//                     body,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             const data = await response.json();
//             if (data.statusCode !== '200') {
//                 return rejectWithValue(data.message);
//             }
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue((error as Error).message);
//         }
//     },
// );

// export const signingIn = createAsyncThunk(
//     'signingIn',
//     async (
//         { email, password }: { email: string; password: string },
//         { fulfillWithValue, rejectWithValue },
//     ) => {
//         try {
//             const body = JSON.stringify({ email, password });
//             const response = await fetch(
//                 'http://122.175.39.120:8087/dadz-api/user/emaillogin',
//                 {
//                     method: 'POST',
//                     body,
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             const data = await response.json();
//             if (data.statusCode !== '200') {
//                 return rejectWithValue(data.message);
//             }
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     },
// );


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        // storeEmailAndMobile: (
        //     state,
        //     action: {
        //         payload: { email: string; mobile: string; name: string };
        //         type: string;
        //     },
        // ) => {
        //     state. = action.payload;
        // },

    },
    extraReducers: builder => {
        builder
            .addCase(signingUpUser.pending, state => {
                state.apiStatuses.signUpUser = 'LOADING';
                // console.log("jklhjlhjkl", action.payload);
            })
            .addCase(signingUpUser.fulfilled, (state, action) => {
                // console.log("jklhjlhjkl", action.payload);
                if (!action.payload.errors) {
                    state.apiStatuses.signUpUser = 'SUCCESS';
                    state.signUpData = action.payload;
                }
                else {
                    state.apiStatuses.signUpUser = 'ERROR';
                    state.signUpErrMsg = action.payload.errors;
                }
                Alert.alert('Success', action.payload.data.errors.email);
            })
            .addCase(signingUpUser.rejected, (state, action) => {
                Alert.alert('Error', action.payload as string);
                state.apiStatuses.signUpUser = 'ERROR';
            });
        // builder
        //     .addCase(verifyOtp.pending, state => {
        //         state.apiStatuses.verifyOtp = 'LOADING';
        //     })
        //     .addCase(verifyOtp.fulfilled, (state, action) => {
        //         state.apiStatuses.verifyOtp = 'SUCCESS';
        //         Alert.alert('Success', action.payload.message);
        //     })
        //     .addCase(verifyOtp.rejected, (state, action) => {
        //         Alert.alert('Error', action.payload as string);
        //         state.apiStatuses.verifyOtp = 'ERROR';
        //     });
        // builder
        //     .addCase(signingIn.pending, state => {
        //         state.apiStatuses.signingIn = 'LOADING';
        //     })
        //     .addCase(signingIn.fulfilled, (state, action) => {
        //         state.apiStatuses.signingIn = 'SUCCESS';
        //         Alert.alert('Success', action.payload.message);
        //     })
        //     .addCase(signingIn.rejected, (state, action) => {
        //         Alert.alert('Error', action.payload as string);
        //         state.apiStatuses.signingIn = 'ERROR';
        //     });
    },
});
// Removed redundant export statement

// export const { signingUpUser } = authSlice.actions;
export default authSlice.reducer;