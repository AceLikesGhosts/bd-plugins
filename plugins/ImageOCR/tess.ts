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

const normalizeUrl = (url: string) => url.substring(0, url.lastIndexOf('?'));

export function inflight(url: string) {
    return inFlight.get(normalizeUrl(url));
}

export function get(url: string) {
    return cache.get(normalizeUrl(url));
}

export async function ocr(url: string): Promise<string> {
    console.log('ocring: ', url);
    const now = Date.now();
    const cached = cache.get(normalizeUrl(url));
    if(cached && cached.expiresAt > now) {
        return cached.text;
    }

    const existing = inFlight.get(normalizeUrl(url));
    if(existing) return existing;

    const task = (async () => {
        try {
            const w = await getWorker();
            const { data } = await w.recognize(url);

            const text = data.text ?? '';

            cache.set(normalizeUrl(url), {
                text,
                expiresAt: Date.now() + TTL
            });

            return text;
        } finally {
            inFlight.delete(normalizeUrl(url));
        }
    })();

    inFlight.set(normalizeUrl(url), task);

    return task;
}