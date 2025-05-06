
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

const getRandomColor = () => {
    const r = 100 + Math.floor(Math.random() * 155);
    const g = 100 + Math.floor(Math.random() * 155);
    const b = 100 + Math.floor(Math.random() * 155);
    return `rgb(${r}, ${g}, ${b})`;
  };
  

function formatNumberAbbreviated(num: number): string {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + "K";
    }
    return num.toString();
}

export const utils = {
    shuffleArray,
    formatNumberAbbreviated,
    getRandomColor,
    playSound
}