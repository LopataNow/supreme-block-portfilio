import { generateParticles } from "./particle";

self.onmessage = (e: MessageEvent<any>) => {
    self.postMessage(generateParticles(e.data));
    self.close();
};

export {};