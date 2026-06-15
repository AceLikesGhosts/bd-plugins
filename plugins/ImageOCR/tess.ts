import { createWorker, Worker } from 'tesseract.js';

type CacheEntry = {
    text: string;
    expiresAt: number;
};

export const cache = new Map<string, CacheEntry>();
export const inFlight = new Map<string, Promise<string>>();

const TTL = 1000 * 60 * 5;

let worker: Worker | null = null;

async function getWorker() {
    if(!worker) {
        worker = await createWorker();
    }

    return worker;
}

export async function closeWorker() {
    if(worker) {
        await worker.terminate();
        worker = null;
    }

    cache.clear();
    inFlight.clear();
}

export async function ocr(url: string): Promise<string> {
    const now = Date.now();
    const cached = cache.get(url);
    if(cached && cached.expiresAt > now) {
        return cached.text;
    }

    const existing = inFlight.get(url);
    if(existing) return existing;

    const task = (async () => {
        try {
            const w = await getWorker();
            const { data } = await w.recognize(url);

            const text = data.text ?? '';

            cache.set(url, {
                text,
                expiresAt: Date.now() + TTL
            });

            return text;
        } finally {
            inFlight.delete(url);
        }
    })();

    inFlight.set(url, task);

    return task;
}