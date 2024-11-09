const hexChars = "0123456789ABCDEF";

export function generateRandomColors(numberOfColors: number) {
    return Array.from({ length: numberOfColors }, () => `#${Array.from({ length: 6 }, () => hexChars[Math.floor(Math.random() * 16)]).join('')}`);
}