// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { OpenAIService } from './openai/openai.service';
import { PollyService } from './polly/polly.service';
import { ConversationController } from './conversation/conversation.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available throughout your application
      envFilePath: '.env', // Specifies the path to your .env file
    }),
  ],
  controllers: [ConversationController],
  providers: [OpenAIService, PollyService],
})
export class AppModule {}
