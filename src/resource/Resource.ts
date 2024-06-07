import { DbAreaOfConcentration, DbSubscription, DbReview } from '../abstracts/Interfaces.js';
import Database from '../Database.js';

export default class Resource {
    public async getAreasOfConcentration(): Promise<DbAreaOfConcentration[]> {
        const areasOfConcentration = await Database.runQuery(`
            SELECT * FROM areaOfConcentration;`
        );

        return areasOfConcentration as DbAreaOfConcentration[];
    }

    public async getSubscriptions(): Promise<DbSubscription[]> {
        const subscriptions = await Database.runQuery(`
            SELECT * FROM subscription;`
        );

        return subscriptions as DbSubscription[];
    }

    public async addMessage(newMessage: any): Promise<any> {
        await Database.runQuery(`
            INSERT INTO Message (
                sender_email,
                message,   
                date
            ) VALUES ( 
                '${newMessage.sender_email}',
                '${newMessage.message}',
                '${newMessage.date}'
            );
        `);
    }

    public async getMessages(): Promise<any> {
        const messages = await Database.runQuery(`
            SELECT * FROM message;`
        );

        return messages;
    }

    public async deleteMessage(messageId: number): Promise<void> {
        await Database.runQuery(`
            DELETE FROM message WHERE id = ${messageId};
        `);
    }
}