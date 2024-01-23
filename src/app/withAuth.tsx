// "use client";

// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useSession } from "next-auth/client";

// const withAuth = (WrappedComponent: React.ComponentType<any>) => {
//   const ComponentWithAuth = (props: any) => {
//     const [session, loading] = useSession();
//     const router = useRouter();

//     useEffect(() => {
//       if (!loading && !session) {
//         router.replace("/signin");
//       }
//     }, [loading, session, router]);

//     if (loading || !session) {
//       return <p>Loading...</p>;
//     }

//     return <WrappedComponent {...props} />;
//   };

//   ComponentWithAuth.displayName = `withAuth(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`;

//   return ComponentWithAuth;
// };

// export default withAuth;
