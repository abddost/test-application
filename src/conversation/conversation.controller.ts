// src/conversation/conversation.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { PollyService } from '../polly/polly.service';
import { Response } from 'express';

@Controller('conversation')
export class ConversationController {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly pollyService: PollyService,
  ) {}

  @Post()
  async converse(@Body('text') text: string, @Res() res: Response) {
    try {
      const aiResponse = await this.openAIService.generateResponse(text);
      const audioStream = await this.pollyService.synthesizeSpeech(aiResponse);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioStream.length,
      });
      res.send(audioStream);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
    }
  }
}
