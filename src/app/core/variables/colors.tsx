export const systemColors: IColors = {
    border: "border-gray-800 dark:border-gray-200",
    borderReverse: "border-gray-200 dark:border-gray-800",
    border10: "border-gray-800/10 dark:border-gray-200/20",
    border20: "border-gray-800/20 dark:border-gray-200/30",
    border30: "border-gray-800/30 dark:border-gray-200/40",
    borderSlate800: "border-slate-800/20 dark:border-slate-300/20",

    text: "text-gray-900 dark:text-gray-100",
    textReverse: "text-gray-100 dark:text-gray-900",
    text10: "text-gray-900/10 dark:text-gray-100/30",
    text50: "text-gray-900/50 dark:text-gray-100/80",
    text60: "text-gray-900/60 dark:text-gray-100/70",
    text70: "text-gray-900/70 dark:text-gray-100/80",
    text80: "text-gray-900/80 dark:text-gray-100/90",
    text90: "text-gray-900/90 dark:text-gray-100/90",

    textSlate300: "text-slate-300 dark:text-slate-400",
    textSlate700: "text-slate-700 dark:text-slate-300",
    textSlate800: "text-slate-800 dark:text-slate-200",

    background: "bg-white dark:bg-gray-900",
    backgroundHover: "hover:bg-gray-50 dark:hover:bg-gray-700",
    backgroundReverse: "bg-gray-900 dark:bg-gray-100",
    backgroundLight: "bg-gray-100 dark:bg-gray-800",
    backgroundSecondary: "bg-gray-50 dark:bg-gray-700",
    backgroundSlate200: "bg-slate-200/50 dark:bg-gray-700/30",
    backgroundSlate300: "bg-slate-300/30 dark:bg-gray-600/30"
}


export const lightColors: IColors = {
    border: "border-black",
    borderReverse: "border-white",
    border10: "border-black/10",
    border20: "border-black/20",
    borderSlate800: "border-slate-800/20",
    border30: "border-black/30",
    
    text: "text-black",
    textReverse: "text-white",
    text10: "text-black/10",
    text50: "text-black/50",
    text60: "text-black/60",
    text70: "text-black/70",
    text80: "text-black/80",
    text90: "text-black/90",
    
    textSlate300: "text-slate-300",
    textSlate700: "text-slate-700",
    textSlate800: "text-slate-800",
    
    background: "bg-white",
    backgroundReverse: "bg-black",

    backgroundLight: "bg-gray-200",
    backgroundHover: "hover:bg-gray-50",
    backgroundSecondary: "bg-white",
    backgroundSlate200: "bg-slate-200/50",
    backgroundSlate300: "bg-slate-300/30"
}

export const darkColors: IColors = {
    border: "border-[#ffffff]",
    borderReverse: "border-black",
    border10: "border-black/20",
    border20: "border-white/40",
    border30: "border-white/50",
    borderSlate800: "border-slate-300/20",

    text: "text-white",
    textReverse: "text-black",
    text10: "text-white/30",
    text50: "text-white/80",
    text60: "text-white/70",
    text70: "text-white/80",
    text80: "text-white/90",
    text90: "text-white/90",

    textSlate300: "text-slate-300",
    textSlate700: "text-slate-300",
    textSlate800: "text-slate-200",

    background: "bg-[#484a5e]",
    backgroundLight: "bg-[#58596d]",
    backgroundHover: "hover:bg-white/50",
    backgroundReverse: "bg-white",
    backgroundSecondary: "bg-gray-600",

    backgroundSlate200: "bg-gray-700/20",
    backgroundSlate300: "bg-slate-800/30"
};


export interface IColors {
    border: string;
    borderReverse: string;
    border10: string;
    border20: string;
    border30: string;
    borderSlate800 : string;

    text: string;
    textReverse: string;
    text10: string;
    text50: string;
    text60: string;
    text70: string;
    text80: string;
    text90: string;

    textSlate300: string;
    textSlate700: string;
    textSlate800: string;
    
    background: string;
    backgroundLight: string;
    backgroundHover: string;
    backgroundReverse: string;
    backgroundSecondary: string;
    backgroundSlate200: string;
    backgroundSlate300: string;
}