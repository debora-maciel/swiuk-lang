// components/PieChart.tsx
"use client";

import { useTheme } from "@/app/core/theme/ThemeContext";
import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

export default function DriverPieChart() {
    const { colors } = useTheme();

    const series = [303, 600];

    const options: ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: ["Known", "Unknown"],
        colors: ["#10B981", "#EF4444", "#FBBF24"],
        legend: {
            position: "bottom",
        },
        dataLabels: {
            formatter: function (val) {
                return `${Number(val).toFixed(1)}%`; // 👈 round & add %
            },
            style: {
                fontSize: "14px",
            },
        }
    };

    return (
        <div className={`w-full flex item-center flex-col h-full min-h-screen gap-10 py-4 ${colors.backgroundLight}`}>
            <div className={`max-w-md bg-white mx-auto p-4 rounded-4xl shadow-m `}>
                <h2 className="text-xl font-semibold text-center mb-4">English</h2>
                <Chart options={options} series={series} type={"pie"} width="100%" />
            </div>
            <div className="max-w-md mx-auto bg-white p-4 rounded-4xl shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4">Driver Status</h2>
                <Chart options={options} series={series} type={"pie"} width="100%" />
            </div>
        </div>
    );
}
