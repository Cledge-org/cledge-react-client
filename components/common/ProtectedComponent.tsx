import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "./loading";

export default function ProtectedComponent({
  children,
}: {
  children: JSX.Element;
}) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("not authenticated. redirecting");
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
}
