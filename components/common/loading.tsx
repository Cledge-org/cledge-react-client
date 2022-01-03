import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <div className="center-child vw-100 vh-100">
      <CircularProgress className="bg-cl-blue" />
    </div>
  );
}
