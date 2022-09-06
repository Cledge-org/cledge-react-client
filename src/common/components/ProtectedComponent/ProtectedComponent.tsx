import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "../Loading/Loading";
import { useLocation } from "src/utils/hooks/useLocation";
import { connect } from "react-redux";
import Link from "next/link";

const ProtectedComponent = ({
  children,
  accountInfo,
}: {
  children: JSX.Element;
  accountInfo: AccountInfo;
}) => {
  const session = useSession();
  const router = useRouter();
  const location = useLocation();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      //console.log("not authenticated. redirecting");
      router.push("/auth/login");
    }
  }, [session, router]);
  if (session.status === "loading") {
    return <LoadingScreen />;
  }
  if (accountInfo && location.includes("uw") && !accountInfo.hasUWAccess) {
    return (
      <div className="vw-100 vh-100 center-child">
        Please go to:
        <Link
          className="mx-1 cl-blue"
          href="https://uw.cledge.org/auth/uw-purchase"
        >
          https://uw.cledge.org/auth/uw-purchase
        </Link>
        to complete your purchase of the UW package
      </div>
    );
  }
  if (session.status === "authenticated") {
    return <>{children}</>;
  }
  return null;
};

export default connect((state) => {
  return {
    accountInfo: state?.accountInfo,
  };
})(ProtectedComponent);
