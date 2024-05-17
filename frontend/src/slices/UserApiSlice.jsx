import { ApiSlice } from './ApiSlice';

export const UserApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/api/login',
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/logout',
                method: 'GET',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'api/register',
                method: 'POST',
                body: data,
            })
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: 'api/forgot-password',
                method: 'POST',
                body: data,
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/reset-password',
                method: 'post',
                body: data
            })
        }),

    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation } = UserApiSlice