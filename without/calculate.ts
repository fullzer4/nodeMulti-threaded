const isPrime = (num: number): boolean => {
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

export const calculate = (start:number, end:number): Array<number> => {
    let results: Array<number> = []

    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
          results.push(i);
        }
    }

    return results
}