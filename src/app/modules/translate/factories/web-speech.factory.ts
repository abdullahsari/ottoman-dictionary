export function webSpeechFactory(): any {
    const w = window as any;
    return w.SpeechRecognition || w.webkitSpeechRecognition;
}
