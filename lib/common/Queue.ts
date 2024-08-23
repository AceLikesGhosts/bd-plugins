type Promisable<T> = T | PromiseLike<T>;

/**
 * A queue that can be used to run tasks consecutively.
 * Highly recommended for things like fetching data from Discord
 */
export default class Queue {
    /**
     * @param maxSize - The maximum amount of functions that can be queued at once.
     *                If the queue is full, the oldest function will be removed.
     */
    constructor(public readonly maxSize = Infinity) { }

    private readonly queue = [] as Array<() => Promisable<unknown>>;

    private promise?: Promise<any>;

    private next() {
        const func = this.queue.shift();
        if(func)
            this.promise = Promise.resolve()
                .then(func)
                .finally(() => this.next());
        else
            this.promise = undefined;
    }

    private run() {
        if(!this.promise)
            this.next();
    }

    /**
     * Append a task at the end of the queue. This task will be executed after all other tasks
     * If the queue exceeds the specified maxSize, the first task in queue will be removed.
     * @param func - Task
     */
    push<T>(func: () => Promisable<T>): void {
        if(this.size >= this.maxSize)
            this.queue.shift();

        this.queue.push(func);
        this.run();
    }

    /**
     * Prepend a task at the beginning of the queue. This task will be executed next
     * If the queue exceeds the specified maxSize, the last task in queue will be removed.
     * @param func - Task
     */
    unshift<T>(func: () => Promisable<T>): void {
        if(this.size >= this.maxSize)
            this.queue.pop();

        this.queue.unshift(func);
        this.run();
    }

    /**
     * The amount of tasks in the queue
     */
    get size(): number {
        return this.queue.length;
    }
}