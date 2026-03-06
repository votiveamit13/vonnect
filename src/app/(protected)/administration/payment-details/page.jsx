"use client";
import { useState } from "react";
import PaymentDetails from "@/components/common/administrator/maintenance/PaymentDetails";
import NavigationHeader from "@/components/common/NavigationHeader";
import './payment-details.css';

export default function PaymentHistory() {

    return (
        <>
        
              <NavigationHeader
          showBack
          backHref="/administration/maintenance"
          title="Payment Details"
          subtitle="UF-102"
        />

        <PaymentDetails
  amountDue="600.00"
  totalPaid="500.00"
/>
        
        
            </>
    );
}