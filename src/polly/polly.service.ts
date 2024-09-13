// src/polly/polly.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class PollyService {
  private polly: AWS.Polly;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.polly = new AWS.Polly();
  }

  async synthesizeSpeech(text: string): Promise<Buffer> {
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Joanna', // Choose a natural-sounding voice
      Engine: 'neural',
    };
    const { AudioStream } = await this.polly.synthesizeSpeech(params).promise();
    return AudioStream as Buffer;
  }
}
