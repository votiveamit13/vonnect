"use client";

import History from "@/components/common/administrator/maintenance/HistoryCard";
import NavigationHeader from "@/components/common/NavigationHeader";
import { useState } from "react";
import './history.css';

export default function HistoryDetailPage() {
  

  return (

    <>

      <NavigationHeader
  showBack
  backHref="/administration/maintenance"
  title="UF-101 History"
  subtitle="Owner: John Smith"
/>

<History/>
    </>
  );
}