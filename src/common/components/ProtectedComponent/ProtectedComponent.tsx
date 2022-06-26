import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "../Loading/Loading";

export default function ProtectedComponent({
  children,
}: {
  children: JSX.Element;
}) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    //console.log(session.data);
    if (session.status === "unauthenticated") {
      //console.log("not authenticated. redirecting");
      router.push("/auth/login");
    }
  }, [session, router]);
  if (session.status === "loading") {
    return <LoadingScreen />;
  }
  if (session.status === "authenticated") {
    return <>{children}</>;
  }
  return null;
}
