'use client';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

type QueryProviderProps = {
    children: React.ReactNode;
    client?: QueryClient;
};

const QueryProvider = ({
    children,
    client = new QueryClient(),
}: QueryProviderProps) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
export type { QueryProviderProps };
