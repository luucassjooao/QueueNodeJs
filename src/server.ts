import 'dotenv/config';
import express from 'express';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';

import { EmailData, EmailQueue } from './app/jobs/Email';
import { QueueData } from './app/lib/Queue';

const app = express();
app.use(express.json());

const emailQueue = new EmailQueue('sendMail');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
createBullBoard({
  queues: [new BullAdapter(emailQueue.queue)],
  serverAdapter: serverAdapter
});
app.use('/admin/queues', serverAdapter.getRouter());

app.post('/unique-email', async (req, res) => {
  const { to, subject, body } = req.body;

  const emailTask: QueueData<EmailData> = {
    data: {
      to: to,
      subject: subject,
      body: body,
    },
    options: {
      delay: 1000,
      attempts: 3,
      removeOnComplete: true,
    },
    limiter: {
      max: 200,
      duration: 10000
    }
  };

  try {
    const job = await emailQueue.add(emailTask);
    res.send(`Tarefa ${job.id} adicionada à fila de envio de emails`);
  } catch (err) {
    console.error(`Erro ao adicionar tarefa à fila de envio de emails: ${err}`);
    res.status(500).send('Erro ao adicionar tarefa à fila de envio de emails');
  }
});

app.post('/multiple-emails', async (req, res) => {
  const destinatarios: EmailData[] = req.body.destinatarios;
  const emailTasks: QueueData<EmailData>[] = [];

  for (const destinatario of destinatarios) {
    emailTasks.push({
      data: {
        to: destinatario.to,
        subject: destinatario.subject,
        body: destinatario.body,
      },
      options: {
        delay: 1000,
        attempts: 3,
        removeOnComplete: true
      },
    });
  }

  try {
    const jobs = await Promise.all(emailTasks.map((task) => emailQueue.add(task)));
    res.send(`Foram adicionadas ${jobs.length} tarefas à fila de envio de emails`);
  } catch (err) {
    console.error(`Erro ao adicionar tarefas à fila de envio de emails: ${err}`);
    res.status(500).send('Erro ao adicionar tarefas à fila de envio de emails');
  }
});

app.listen(7000, () => {
  console.log('server is running on port 7000 👺');
});

