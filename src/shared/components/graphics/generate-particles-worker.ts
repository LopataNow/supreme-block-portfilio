import { generateParticles } from "./particle";

self.onmessage = (e: MessageEvent<any>) => {
    let finished = 0;
    const result: any[] = [];
    const randomX = Math.random();
    const randomY = Math.random();

    for(let i = 0; i < 1; i++){
        const worker = new Worker(new URL("./generate-block-particles-worker.ts", import.meta.url));
        worker.onmessage = (event) => {

            finished++;
            result.push(...event.data);
            if(finished === 1){
                self.postMessage(result);
                self.close();
            }
        };
        worker.postMessage({
            startX: i * e.data.width / 4,
            startY: 0,
            width: (i + 1) * e.data.width / 4,
            height: e.data.height,
            padding: e.data.padding,
            spaces: e.data.spaces,
            randomX,
            randomY,
        });
    }
};

export {};