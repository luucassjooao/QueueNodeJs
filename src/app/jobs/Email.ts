import { BullQueue } from "../lib/Queue";
import { sendMail } from "../utils/sendMail";

export interface EmailData {
  to: string;
  subject: string;
  body: string;
};

export class EmailQueue extends BullQueue<EmailData> {
  constructor(queueName: string) {
    super(queueName);
  }

  protected async process(): Promise<void> {
    this.queue.process(async (job) => {
      const { to, subject, body } = job.data;
      await sendMail(to, subject, body);
    });

    this.queue.on('failed', (job, error) => {
      console.error(`A tarefa ${job.id} falhou com o seguinte erro: ${error.message}`);
    });

    this.queue.on('completed', (job) => {
      console.log(`A tarefa ${job.id} foi concluída com sucesso!`);
    });
  }
}
