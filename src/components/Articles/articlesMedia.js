
export function getArticleImage(image) {
    if (!image) return "";

    const API_URL = import.meta.env.VITE_API_URL;

    try {
        return new URL(image, API_URL).href;
    } catch {
        return "";
    }
}
