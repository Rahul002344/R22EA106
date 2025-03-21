import React from "react";
import AnalyticsChart from "@/components/AnalyticsChart";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Social Media Analytics</h1>
      <AnalyticsChart />
    </div>
  );
}
