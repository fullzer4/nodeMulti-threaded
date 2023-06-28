import fastify from 'fastify'
import { calculate } from './calculate';

const server = fastify()

server.get('/calculate', async (request, reply) => {
  const start = 1;
  const end = 100_000_000;

  try {
    const primes = await calculate(start, end);
    return `${primes}`;
  } catch (error) {
    console.error('Erro:', error);
    throw new Error('Erro no cálculo dos números primos.');
  }
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})