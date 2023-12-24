'use client';

import Image from 'next/image';

import { useSession } from 'next-auth-hook';
import Link from 'next/link';

export default function Home() {
    const { session, loading, isAuthenticated, email } = useSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <div
            className={'flex flex-col items-center justify-center'}
            >
                <h1
                className={'text-4xl font-bold mb-4'}
                >next-auth-hook</h1>
                <p>
                    Next.js example with TailwindCSS
                </p>

                <div 
                className={'bg-blue-500 text-white p-4 rounded-md mt-4 w-full flex flex-col items-center'}
                >
                    {
                        JSON.stringify(session, null, 2)
                    }
                    <p>
                        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                    </p>

                    {
                        (!isAuthenticated) && (
                            <Link
                            href={'/api/auth/signin'}
                            className={'bg-white text-blue-500 p-2 rounded-md mt-4'}
                            >
                                Sign In
                            </Link>
                        )
                    }
                </div>
            </div>
        </main>
    );
}
