// // hooks/useSession.ts
// import { Session } from 'next-auth';
// import { useSession as useNextAuthSession } from 'next-auth/react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   image: string;
// }

// interface ExtendedSession extends Session {
//   user: User | null;
// }

// const useSession = () => {
//   return useNextAuthSession<ExtendedSession>();
// };

// export default useSession;
