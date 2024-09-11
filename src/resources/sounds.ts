import { DEBUG } from "../debug";
import { hasTouch } from "../utils/browser";
import { createAudioBuffer } from "./sfxr";

let audioContext: AudioContext | undefined = undefined;

export const soundsBuffers: ArrayBuffer[] = [];
const sounds: AudioBuffer[] = [];

const masterVolume = 0.5;

const initSoundOnStart = () => {
    if (!hasTouch) {
        initSound();
    }
}

export function initSound() {
    if (!audioContext) {
        audioContext = new AudioContext();

        if (DEBUG) {
            console.log("sound inited");
        }
    }
}

export function playSound(id: number, volume: number = 1.0) {
    if (audioContext) {
        if (!sounds[id]) {
            sounds[id] = createAudioBuffer(audioContext, new Float32Array(soundsBuffers[id]));
        }

        const source = audioContext.createBufferSource();
        source.buffer = sounds[id];

        const gainNode = audioContext.createGain();
        gainNode.gain.value = masterVolume * volume;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.start();
    }
}

initSoundOnStart();