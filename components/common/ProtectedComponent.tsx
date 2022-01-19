import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "./loading";

export default function ProtectedComponent({
  children,
}: {
  children: JSX.Element;
}) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session.data);
    if (!session.data?.user) {
      console.log("not authenticated. redirecting");
      router.push("/auth/login");
    }
  }, [session, router]);
  if (session.status === "loading") {
    return <LoadingScreen />;
  }
  if (session.data?.user) {
    return <>{children}</>;
  }
  return null;
}
