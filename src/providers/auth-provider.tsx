/* next-auth-hook */

'use client';

import { useContext, createContext } from 'react';
import { getSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { signOut, signIn } from 'next-auth/react';
import type { User } from 'next-auth';
import type {
    SignOutParams,
    SignInOptions,
    SignInResponse,
    LiteralUnion,
} from 'next-auth/react';

import type { Session } from 'next-auth';

import type { BuiltInProviderType } from 'next-auth/providers/index';

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    email: string | null;
    loading?: boolean;
    signOut: (a: SignOutParams) => Promise<void>;
    signIn: (
        provider: LiteralUnion<BuiltInProviderType>,
        options: SignInOptions,
    ) => Promise<SignInResponse | void>;
    session?: Session | null;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    email: '',
    loading: true,
    signOut: async (a: SignOutParams) => {
        return signOut(a);
    },
    signIn: async (
        provider: LiteralUnion<BuiltInProviderType>,
        options?: SignInOptions,
    ) => {
        return signIn(provider, options);
    },
    session: null,
});

const useSession = () => useContext(AuthContext);

type AuthProviderProps = {
    children?: React.ReactNode;
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

    const newSignOut = async (a: SignOutParams) => {
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
        <AuthContext.Provider
            value={{
                isAuthenticated: !!session,
                user: (session?.user as User) ?? null,
                email: session?.user?.email ?? null,
                loading: status === 'pending',
                signOut: newSignOut,
                signIn: newSignIn,
                session,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext, useSession };
export type { AuthContextType, AuthProviderProps };
