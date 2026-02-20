import Link from "next/link";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import Image from "next/image";

export default async function ForgotPasswordPage({ searchParams }) {
    const params = await searchParams;
    const sent = params?.sent === "1";
    const role = params?.role || "owner";
    const email = params?.email || "test@yopmail.com";

    return (
        <main className="min-h-screen w-full bg-[#001F3F] relative">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full h-14 sm:h-16 flex items-center px-4 sm:px-6">
                <Link
                    href={`/login?role=${role}`}
                    className="flex items-center gap-2 text-white text-[16px] hover:opacity-80"
                >
                    <FiArrowLeft size={18} />
                    Back to Login
                </Link>
            </div>

            {/* Centered Content */}
            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20">
                <div className="w-full max-w-lg text-center">
                    {/* Card */}

                    {!sent ? (
                        <>
                            {/* Title */}
                            <h1 className="text-white text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-wide">
                                VONNECT
                            </h1>
                            <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] mt-2 mb-8">
                                Reset Your Password
                            </p>
                            <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
                                <p className="text-[#4A5565] text-[16px] mb-5">
                                    Enter your email address and we will send you a link to reset your password.
                                </p>

                                {/* Email */}
                                <label className="block text-[#364153] text-[16px] mb-2">
                                    Email Address
                                </label>
                                <div className="group flex items-center gap-3 border border-[#CBD5E1] rounded-xl px-4 h-[52px] sm:h-[56px] mb-6 transition
                                focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#001F3F]">
                                    <FiMail className="text-[#94A3B8] group-focus-within:text-[#001F3F]" size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full outline-none text-sm sm:text-base placeholder:text-[#0A0A0A]/50 bg-transparent"
                                    />
                                </div>

                                {/* Submit (mock success redirect) */}
                                <Link
                                    href={`/forgot-password?role=${role}&sent=1&email=test@yopmail.com`}
                                    className="block"
                                >
                                    <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium 
                                     hover:bg-[#003d7a] transition">
                                        Send Reset Link
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white rounded-2xl shadow-lg px-5 sm:px-8 py-6 sm:py-8 text-left">
                                {/* Success Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="rounded-full flex items-center justify-center">
                                        <Image
                                            src="/assets/icons/success.svg"
                                            alt="Success"
                                            width={62}
                                            height={62}
                                        />
                                    </div>
                                </div>

                                <h3 className="text-center text-[24px] font-medium text-[#001F3F] mb-2">
                                    Check Your Email
                                </h3>
                                <p className="text-center text-[16px] text-[#4A5565] mb-6">
                                    We have sent a password reset link to{" "}
                                    <span className="font-medium text-[#001F3F]">{email}</span>.
                                    Please check your inbox and follow the instructions.
                                </p>

                                <Link href={`/login?role=${role}`}>
                                    <button className="w-full h-[48px] sm:h-[52px] rounded-xl bg-[#001F3F] text-white font-medium 
                                     hover:bg-[#003d7a] transition">
                                        Back to Login
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
