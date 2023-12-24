'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from 'next-auth-hook';
const queryClient = new QueryClient();

const QueryProvider = ({ children }: any) => {
    const a = new QueryClient();
    return <QueryClientProvider client={a}>{children}</QueryClientProvider>;
    }
;

const Providers = ({ children }: any) => {
    return (
        <QueryProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryProvider>
    )
}

export default QueryProvider;

export { QueryProvider, Providers };