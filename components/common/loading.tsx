import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <div>
      <CircularProgress className="bg-cl-blue" />
    </div>
  );
}
