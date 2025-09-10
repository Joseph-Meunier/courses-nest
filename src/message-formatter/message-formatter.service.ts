import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFormatterService {

    format(message: string) {
        const now = new Date();
        const formattedDate = now.toISOString();
        return `${formattedDate} ${message}`;
    }
}
