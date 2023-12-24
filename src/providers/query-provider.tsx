'use client';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

type QueryProviderProps = {
    children?: React.ReactNode;
    client?: QueryClient;
};


const QueryProvider = ({
    children,
    client,
}: QueryProviderProps) => {
    if (!client) {
        client = new QueryClient();
    }

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
export type { QueryProviderProps };
