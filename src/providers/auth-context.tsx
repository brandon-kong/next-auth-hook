/* next-auth-hook */

'use client';

import { useContext, createContext, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { signOut, signIn } from 'next-auth/react';
import type { User } from 'next-auth';
import type {
    SignOutParams,
    SignInOptions,
    SignInResponse,
    LiteralUnion,
} from 'next-auth/react';

import type { BuiltInProviderType } from 'next-auth/providers/index';
import QueryProvider from './query-provider';

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    email: string | null;
    loading?: boolean;
    signOut: (a: SignOutParams<false>) => Promise<void>;
    signIn: (
        provider: LiteralUnion<BuiltInProviderType>,
        options: SignInOptions,
    ) => Promise<SignInResponse | undefined>;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    email: '',
    loading: true,
    signOut: async (a: SignOutParams<false>) => {
        return signOut();
    },
    signIn: async (
        provider: LiteralUnion<BuiltInProviderType>,
        options?: SignInOptions,
    ) => {
        return signIn(provider, options);
    },
});

const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const {
        data: session,
        status,
        refetch,
    } = useQuery({
        queryKey: ['session'],
        queryFn: () => getSession(),
    });

    const newSignOut = async (a: SignOutParams<false>) => {
        try {
            const response = await signOut(a);
            refetch();
        } catch (e) {
            return;
        }
    };

    const newSignIn = async (
        provider: LiteralUnion<BuiltInProviderType>,
        options?: SignInOptions,
    ) => {
        try {
            const response = await signIn(
                provider,
                options,
            );
            refetch();

            return response;
        } catch (e) {
            return;
        }
    };

    return (
        <QueryProvider>
            <AuthContext.Provider
                value={{
                    isAuthenticated: !!session,
                    user: (session?.user as User) ?? null,
                    email: session?.user?.email ?? null,
                    loading: status === 'pending',
                    signOut: newSignOut,
                    signIn: newSignIn,
                }}
            >
                {children}
            </AuthContext.Provider>
        </QueryProvider>
    );
};

export default AuthProvider;
export { AuthContext, useAuth };
export type { AuthContextType, AuthProviderProps };
