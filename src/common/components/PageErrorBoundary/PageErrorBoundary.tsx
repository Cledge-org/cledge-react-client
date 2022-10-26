import { getAnalytics, logEvent } from "firebase/analytics";
import { useRouter } from "next/router";
import { ComponentType, ReactElement } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { alertSlackError } from "src/utils/apiCalls";
import { getFirebaseClientApp } from "src/utils/firebase/getFirebaseApp";

const PageErrorBoundary = ({
  children,
}: {
  children: ReactElement | string | ReactElement[];
}) => {
  const router = useRouter();
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="center-child flex-column"
        >
          <span style={{ fontSize: "1.4em" }}>Uh Oh</span>
          <strong style={{ fontSize: "1.3em" }}>
            It looks like an error has occurred, please refresh the page and try
            again, if nothing is working please wait and we'll get to fixing the
            error.
          </strong>
        </div>
      )}
      onError={(error) => {
        if (process.env.NEXTAUTH_URL !== "http://localhost:3000") {
          logEvent(getAnalytics(getFirebaseClientApp()), 'error', {'error_name': error.name as string});
          alertSlackError(
            `${process.env.NEXTAUTH_URL + router.pathname}\n${
              error.name as string
            }\n\n${error.message as string}\n\n${error.stack as string}\n\n${
              error.cause && (error.cause?.stack as string)
            }\n\n`
          );
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
export default PageErrorBoundary;
