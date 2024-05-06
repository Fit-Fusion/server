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

    public async getReviews(): Promise<DbReview[]> {
        const reviews = await Database.runQuery(`
            SELECT * FROM review;`
        );

        return reviews as DbReview[];
    }
}