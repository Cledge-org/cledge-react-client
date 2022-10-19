import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

// logged in landing page
const UploadPage = ({
  children,
  onUpload,
}: {
  children: JSX.Element | JSX.Element[];
  onUpload: Function;
}) => {
  const router = useRouter();
  const session = useSession();
  if (session.data?.user?.email === "hello.cledge@outlook.com") {
    return (
      <PageErrorBoundary>
        <div className="">
          <div className="">{children}</div>
        </div>
      </PageErrorBoundary>
    );
  }
  return (
    <div>
      <div>
        <div>404</div>
        <div>This page could not be found.</div>
      </div>
    </div>
  );
};
UploadPage.requireAuth = true;
export default UploadPage;
