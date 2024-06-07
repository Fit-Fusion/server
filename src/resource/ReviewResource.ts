import { DbReview, Review } from '../abstracts/Interfaces.js';
import Database from '../Database.js';

export default class ReviewResource {
    public async addReview(newReview: Review): Promise<void> {
        await Database.runQuery(`
            INSERT INTO Review (
                description,
                rating, 
                reviewer_id, 
                reviewer_type,  
                review_date
            ) VALUES ( 
                '${newReview.description}',
                ${newReview.rating},
                ${newReview.reviewerId},
                '${newReview.reviewerType}',
                '${newReview.reviewDate}'
            );
        `);
    }

    public async getReviews(): Promise<DbReview[]> {
        const reviews = await Database.runQuery(`
            SELECT * FROM review;`
        );

        return reviews as DbReview[];
    }

    public async deleteReview(reviewId: number): Promise<void> {
        await Database.runQuery(`
            DELETE FROM review WHERE id = ${reviewId};
        `);
    }
}