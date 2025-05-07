export const systemColors: IColors = {
    border: "border-black dark:border-white",
    border10: "border-black/10 dark:border-white/40",
    border20: "border-black/20 dark:border-white/40",
    border30: "border-black/30 dark:border-white/50",

    text: "text-black dark:text-white",
    textReverse: "text-white dark:text-black",
    text50: "text-black/50 dark:text-white/80",
    text60: "text-black/60 dark:text-white/70",
    text70: "text-black/70 dark:text-white/80",
    text80: "text-black/80 dark:text-white/90",
    text90: "text-black/90 dark:text-white/90",

    textSlate700: "text-slate-700 dark:text-slate-300",
    textSlate800: "text-slate-800 dark:text-slate-200",

    background: "bg-white dark:bg-black",
    backgroundReverse: "bg-black dark:bg-white",

    backgroundSlate200: "bg-slate-200/50 dark:bg-gray-700/20",
}


export const lightColors: IColors = {
    border: "border-black",
    border10: "border-black/10",
    border20: "border-black/20",
    border30: "border-black/30",

    text: "text-black",
    textReverse: "text-white",
    text50: "text-black/50",
    text60: "text-black/60",
    text70: "text-black/70",
    text80: "text-black/80",
    text90: "text-black/90",

    textSlate700: "text-slate-700",
    textSlate800: "text-slate-800",

    background: "bg-white",
    backgroundReverse: "bg-black",

    backgroundSlate200: "bg-slate-200/50",
}

export const darkColors: IColors = {
    border: "border-white",
    border10: "border-white/40",
    border20: "border-white/40",
    border30: "border-white/50",

    text: "text-white",
    textReverse: "text-black",
    text50: "text-white/80",
    text60: "text-white/70",
    text70: "text-white/80",
    text80: "text-white/90",
    text90: "text-white/90",

    textSlate700: "text-slate-300",
    textSlate800: "text-slate-200",

    background: "bg-black",
    backgroundReverse: "bg-white",

    backgroundSlate200: "bg-gray-700/20",
};


export interface IColors {
    border: string;
    border10: string;
    border20: string;
    border30: string;
    text: string;
    textReverse: string;
    text50: string;
    text60: string;
    text70: string;
    text80: string;
    text90: string;
    textSlate700: string;
    textSlate800: string;
    background: string;
    backgroundReverse: string;
    backgroundSlate200: string;
}