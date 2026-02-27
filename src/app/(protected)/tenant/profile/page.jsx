
import Profile from "@/components/common/tenant-management/ProfilePage";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <Profile/>
    </Suspense>
  );
}