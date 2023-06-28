import { Worker } from 'worker_threads';

export const calculate = (start: number, end: number): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    const workerCount = 4; 
    const results:  Array<number[]> = [];

    const range = Math.ceil((end - start + 1) / workerCount);
    let pending = workerCount;

    const handleWorkerMessage = (result: Array<number>, index: number) => {
      results[index] = result;
      pending--;

      if (pending === 0) {
        const primes = results.flat();
        resolve(primes);
      }
    };

    for (let i = 0; i < workerCount; i++) {
      const workerStart = start + i * range;
      const workerEnd = Math.min(start + (i + 1) * range - 1, end);

      const worker = new Worker('./dist/worker.js', { workerData: { start: workerStart, end: workerEnd } });

      worker.on('message', (result:  Array<number>) => {
        handleWorkerMessage(result, i);
      });

      worker.on('error', (error: Error) => {
        reject(error);
      });

      worker.on('exit', (code: number) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    }
  });
};