'use client';

import React from "react";

import QueryProvider from "./query-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthProvider from "./auth-provider";

export default function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}