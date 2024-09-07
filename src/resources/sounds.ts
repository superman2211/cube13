import { audioContext, createAudioBuffer } from "./sfxr";

export const soundsBuffers: ArrayBuffer[] = [];
const sounds: AudioBuffer[] = [];

export function playSound(id: number, volume: number) {
    if (!sounds[id]) {
        sounds[id] = createAudioBuffer(new Float32Array(soundsBuffers[id]));
    }

    const source = audioContext.createBufferSource();
    source.buffer = sounds[id];

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode)
    gainNode.connect(audioContext.destination)

    source.start();
}