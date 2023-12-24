import React from 'react';
import type {
    AuthProviderProps,
    AuthContextType,
} from './providers/auth-context';

export declare function useSession(): AuthContextType;
export declare const AuthContext: React.Context<AuthContextType>;
export declare const AuthProvider: (
    props: AuthProviderProps,
) => JSX.Element;

export * from './providers/query-provider';
