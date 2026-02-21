import NavigationHeader from "@/components/common/NavigationHeader";
import UserAgreement from "@/components/common/UserAgreement";

export default function AgreementPage() {
    return (
        <main className="min-h-screen w-full">
            <NavigationHeader
                showBack
                backHref="/owner/profile?tab=about"
                title="End User License Agreement"
                subtitle="Legal terms and conditions"
            />

            <UserAgreement
                content={`PLEASE READ THIS END USER LICENSE AGREEMENT ("LICENSE") CAREFULLY BEFORE USING THE VONNECT WEB/MOBILE APPLICATION ("APPLICATION").

                    IF YOU DO NOT AGREE TO THE TERMS OF THIS LICENSE, DO NOT USE THE APPLICATION.

                    1. General  
                    The Application is licensed, not sold...

                    2. License Grant  
                    Company grants you a revocable, non-exclusive, non-transferable license...

                    3. Restrictions  
                    You shall not reverse engineer, sublicense, modify...

                    4. Disclaimer Of Warranties  
                    The Application is provided "AS IS"...

                    5. Limitation Of Liability  
                    Company’s liability shall not exceed Fifty Dollars ($50.00).

                    6. Governing Law  
                    This License shall be governed by the laws of Singapore.`}
                lastUpdated="December 25, 2024"
            />
        </main>
    );
}
