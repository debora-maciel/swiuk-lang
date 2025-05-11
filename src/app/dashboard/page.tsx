"use client"

import { useTheme } from "../core/context/theme/ThemeContext";
import DriverPieChart from "./components/DriverPieChart";

export default function Dashboard(){
    const { colors } = useTheme();

    return (
        <div className={`w-full flex overflow-y-scroll pt-4 items-start gap-4 ${colors.backgroundLight} pb-20`}>
             <DriverPieChart />
        </div>
    )
}