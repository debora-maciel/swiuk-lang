"use client";

import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DriverPieChart() {
    const { colors } = useTheme();
    const [DEknownWords, setDEKnownWords] = useState<string[]>([]);
    const [ENknownWords, setENKnownWords] = useState<string[]>([]);

    const [ENUknownWords, setENUknownWords] = useState<string[]>([]);
    const [DEUknownWords, setDEUknownWords] = useState<string[]>([]);

    useEffect(() => {
        const ENknown = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const DEknown = JSON.parse(localStorage.getItem("DEknownWords") || "[]");

        const DEUnknown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");
        const ENUnknown = JSON.parse(localStorage.getItem("unknownWords") || "[]");

        setENKnownWords(ENknown);
        setENUknownWords(ENUnknown);

        setDEKnownWords(DEUnknown);
        setDEUknownWords(DEknown);
    }, []);


    const seriesEnglish = [ENknownWords.length, ENUknownWords.length];
    const seriesDeutsch = [DEknownWords.length, DEUknownWords.length];

    const options: ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: ["Unknown", "Known"],
        colors: ["#657483", "#6aa4da"],
        legend: {
            position: "bottom",
        },
        dataLabels: {
            formatter: function (val, opts) {
                return `${opts.w.config.series[opts.seriesIndex]}`;
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
                <Chart options={options} series={seriesEnglish} type={"pie"} width="100%" />
            </div>
            <div className="max-w-md mx-auto bg-white p-4 rounded-4xl shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4">Deutsch</h2>
                <Chart options={options} series={seriesDeutsch} type={"pie"} width="100%" />
            </div>
        </div>
    );
}
