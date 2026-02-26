import ResetPassword from "@/components/common/ResetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPassword/>
    </Suspense>
  );
}