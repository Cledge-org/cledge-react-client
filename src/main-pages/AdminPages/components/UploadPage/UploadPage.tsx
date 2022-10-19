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
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";

// logged in landing page
const UploadPage: NextApplicationPage<{
  children: JSX.Element | JSX.Element[];
  onUpload: Function;
}> = ({ children, onUpload }) => {
  const router = useRouter();
  const session = useSession();
  if (session.data?.user?.email === "hello.cledge@outlook.com") {
    return (
      <PageErrorBoundary>
        <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center w-50">
            {children}
            <button
              className="mt-3"
              onClick={() => {
                onUpload();
              }}
            >
              Upload
            </button>
          </div>
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
