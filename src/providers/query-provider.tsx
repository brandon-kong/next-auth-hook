import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

type QueryProviderProps = {
    children: React.ReactNode;
    client?: QueryClient;
};

const QueryProvider = ({
    children,
    client = queryClient,
}: QueryProviderProps) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
export { queryClient as NextAuthHookQueryClient };
export type { QueryProviderProps };
