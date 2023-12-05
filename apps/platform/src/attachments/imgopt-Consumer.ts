import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import sharp from 'sharp';

@Processor('img-optimization')
export class ImgOptmizerConsumer extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    const filePath = job.data.filePath;
    console.log('processing', job.data);

    // convert to webp and resize to 200x200 and 300x300 and 600x600 using sharp
    const img300 = await sharp(filePath)
      .resize(300, 300)
      .webp()
      .toFile(filePath + '-300.webp');

    const img600 = await sharp(filePath)
      .resize(600, 600)
      .webp()
      .toFile(filePath + '-600.webp');

    const img200 = await sharp(filePath)
      .resize(200, 200)
      .webp()
      .toFile(filePath + '-200.webp');

    // calculate size of each file
    const img300Size = img300.size;
    const img600Size = img600.size;
    const img200Size = img200.size;

    const orginalSize = await sharp(filePath)
      .webp()
      .toBuffer()
      .then((data) => data.length);

    // log the size of each file in kb
    console.log('orginalSize', orginalSize / 1024);
    console.log('img300Size', img300Size / 1024);
    console.log('img600Size', img600Size / 1024);
    console.log('img200Size', img200Size / 1024);

    // save to disk

    // update attachment in db

    return job.data;
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    console.log('completed');
  }
}
