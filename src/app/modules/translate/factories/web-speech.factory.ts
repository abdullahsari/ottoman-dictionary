/**
 * Retrieves the Web Speech API object from the DOM
 * @returns {any} Web Speech API
 */
export function webSpeechFactory(): any {
    const w = window as any;
    return w.SpeechRecognition || w.webkitSpeechRecognition;
}
