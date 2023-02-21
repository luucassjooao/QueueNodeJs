import QueueBull, { Queue, Job, JobOptions, RateLimiter } from 'bull';

export interface QueueData<T> {
  data: T;
  options?: JobOptions;
  limiter?: RateLimiter;
}

export abstract class BullQueue<T> {
  public queue: Queue<T>;

  protected constructor(queueName: string) {
    // Poderia também abstrair a URL do redis aqui,
    // colocando por exemplo um parâmetro chamado queueUrl, e passando ele na instância do QueueBull
    // no lugar do objeto do Redis
    this.queue = new QueueBull(queueName, {
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
    this.process();
  }

  public async add(queueData: QueueData<T>): Promise<Job<T>> {
    return this.queue.add(queueData.data, queueData.options);
  }

  protected abstract process(): Promise<void>;
}
