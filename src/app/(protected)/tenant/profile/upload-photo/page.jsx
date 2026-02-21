import NavigationHeader from "@/components/common/NavigationHeader";
import UploadFile from "@/components/UploadFile";

export default async function UploadPhotoPage() {
  return (
    <main className="min-h-screen w-full bg-[#F5F7FA]">
      <NavigationHeader
        showBack
        backHref="/owner/profile"
        title="Upload Photo"
        subtitle="Update your profile picture"
      />

      <UploadFile
        title="Upload Photo"
        subtitle="Upload a profile photo to personalize your account"
        buttonLabel="Choose Photo"
        accept="image/*"
        />

    </main>
  );
}
