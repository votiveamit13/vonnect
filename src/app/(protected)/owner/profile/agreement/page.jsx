"use client";

import NavigationHeader from "@/components/common/NavigationHeader";
import UserAgreement from "@/components/common/UserAgreement";
import Loader from "@/components/Loader";
import { getAgreementApi } from "@/lib/api";
import { useEffect, useState } from "react";

export default function AgreementPage() {
    const [agreement, setAgreement] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                setLoading(true);
                const res = await getAgreementApi();
                setAgreement(res.data?.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load agreement");
            } finally {
                setLoading(false);
            }
        };

        fetchAgreement();
    }, []);

    return (
        <main className="min-h-screen w-full">
            <NavigationHeader
                showBack
                backHref="/owner/profile?tab=about"
                title="End User License Agreement"
                subtitle="Legal terms and conditions"
            />

            {loading ? (
                <Loader text="Loading..." size="md" />
            ) : (
                <UserAgreement
                    content={agreement?.content}
                    lastUpdated={agreement?.last_updated}
                />
            )}
        </main>
    );
}
