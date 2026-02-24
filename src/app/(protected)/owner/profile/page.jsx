import Profile from "@/components/common/profile-management/ProfilePage";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <Profile/>
    </Suspense>
  );
}