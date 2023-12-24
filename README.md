# next-auth-hook

> A simple React hook for NextAuth.js with Next.js App Router

[![NPM](https://img.shields.io/npm/v/next-auth-hook.svg)](https://www.npmjs.com/package/next-auth-hook) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/) [![License](https://img.shields.io/npm/l/next-auth-hook)](MIT)


### Install
Install it with your package manager of choice:


##### NPM
```bash
npm install --save next-auth next-auth-hook 
```

##### Yarn
```bash
yarn add next-auth-hook
```

### Setup

1. Set up NextAuth.js in your Next.js app, following the [official documentation](https://next-auth.js.org/configuration/initialization#route-handlers-app).

2. Wrap your app with the `AuthProvider` component in `app/layout.js` or `app/layout.ts`:

```jsx
import { AuthProvider } from 'next-auth-hook';

export default function RootLayout({ children }) {
  return (
    ...
    <body>
        <AuthProvider>
            { children }
        </AuthProvider>
    </body>
    ...
  );
};
```


### Usage
```tsx
'use client';

import { useSession } from 'next-auth-hook';

const MyComponent = () => {
    // Destructure the state of the session from the hook
    const { session, isAuthenticated, loading } = useSession();

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Conditionally render based on authentication state

    if (!session) {
        return <div>Not signed in</div>;
    }

    return <div>Signed in as {session.user.email}</div>;
};
```

### API

#### `AuthProvider`
The `AuthProvider` component is a wrapper for your app that provides the `useSession` hook with the session state.

#### `useSession`
The `useSession` hook returns an object with the following properties:

##### Properties

| Name | Type | Description |
| --- | --- | --- |
| `session` | `Session` | The current session object, or `null` if there is no session. |
| `isAuthenticated` | `boolean` | Whether or not there is a session. |
| `loading` | `boolean` | Whether or not the session is loading. |
| `user` | `NextAuthUser` | The current user object, or `null` if there is no session. |
| `signIn` | `(SignInProviders, Options) => Promsie<SignInResponse \| void>` | A function that signs in the user. |
| `signOut` | `(SignOutParams) => Promise<void>` | A function that signs out the user. |

> **Note:** The `signIn` and `signOut` functions are wrappers for the `signIn` and `signOut` functions from NextAuth.js. Conveniently, the parameters are unchanged.
See the [official documentation](https://next-auth.js.org/getting-started/client#signin) for more information on the parameters.

### License

ISC © [brandon-kong](/LICENSE)

### Acknowledgements

This project uses the following open source packages:

- [NextAuth.js](https://next-auth.js.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [react-query](https://react-query.tanstack.com/)