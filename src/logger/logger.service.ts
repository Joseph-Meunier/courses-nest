import { Injectable } from '@nestjs/common';
import { MessageFormatterService } from 'src/message-formatter/message-formatter.service';

@Injectable()
export class LoggerService {
    constructor(private readonly messageformatter: MessageFormatterService) {}

    log(message: string): string {
        return this.messageformatter.format(message);
    }
}
