import fs from 'fs';
import axios from 'axios';

const numTests = 20;
const multiThreadServerURL = 'http://localhost:8080/calculate';
const singleThreadServerURL = 'http://localhost:8081/calculate';

const makeRequest = async (url: string): Promise<number> => {
    const start = process.hrtime();
    await axios.get(url);
    const end = process.hrtime(start);
    const duration = (end[0] * 1e9 + end[1]) / 1e6;
    return duration;
};

const runTests = async (serverURL: string, testName: string): Promise<number[]> => {
    const responseTimes: Array<number> = [];
  
    for (let i = 0; i < numTests; i++) {
      try {
        const duration = await makeRequest(serverURL);
        responseTimes.push(duration);
        console.log(`${testName} Test ${i + 1}: ${duration} ms`);
      } catch (error) {
        console.error(`${testName} Test ${i + 1}: Erro na solicitação`, error);
      }
    }
  
    return responseTimes;
};

(async () => {
    try {
      const multiThreadResponseTimes = await runTests(multiThreadServerURL, 'Multi-Thread');
  
      const singleThreadResponseTimes = await runTests(singleThreadServerURL, 'Single-Thread');
  
      const results = {
        multiThread: multiThreadResponseTimes,
        singleThread: singleThreadResponseTimes,
      };
  
      fs.writeFileSync('results.txt', JSON.stringify(results, null, 2));
      console.log('Task completed');
    } catch (error) {
      console.error('Error while running tests:', error);
    }
})();
