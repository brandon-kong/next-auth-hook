'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from '../../../../src';
const queryClient = new QueryClient();

const QueryProvider = ({ children }: any) => {
    return <QueryClientProvider client={queryClient}>
        <AuthProvider
        client={queryClient}
        >
            {children}
        </AuthProvider>
        
        </QueryClientProvider>;
    }
;

const Providers = ({ children }: any) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export { QueryProvider, Providers };