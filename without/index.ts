import fastify from 'fastify'
import { calculate } from './calculate';

const server = fastify()

server.get('/calculate', async (request, reply) => {

    const start = 1;
    const end = 10_000_000;

    const result: Array<number> = calculate(start, end)
    return `${result}`
})

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
