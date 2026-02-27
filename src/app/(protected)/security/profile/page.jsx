
import Profile from "@/components/common/security-management/ProfilePage";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <Profile/>
    </Suspense>
  );
}