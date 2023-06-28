import { parentPort, workerData } from 'worker_threads';

const isPrime = (num: number):boolean => {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const { start, end } = workerData;
const results = [];

for (let i = start; i <= end; i++) {
  if (isPrime(i)) {
    results.push(i);
  }
}

parentPort?.postMessage(results);
