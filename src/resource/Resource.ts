import { DbAreaOfConcentration, DbClass, DbSubscription, DbUser, User } from '../abstracts/Interfaces.js';
import Database from '../Database.js';
import { DbReview } from '../abstracts/Interfaces';

export default class UserResource {
    private defaultPassword = 'password';
    private defaultPlanId = 1;
    
    public async addUser(newUser: User) {
        await Database.runQuery(`
            INSERT INTO User (
                firstname,
                lastname, 
                password, 
                email, 
                phone_number, 
                date_of_birth,
                areas_of_concentration, 
                weight,
                plan_id,
                role,
                gender
            ) VALUES ( 
                '${newUser.firstName}', 
                '${newUser.lastName}', 
                '${this.defaultPassword}',
                '${newUser.email}',
                '${newUser.phoneNumber}',
                '${newUser.dateOfBirth}', 
                '${newUser.areasOfConcentration}',
                '${newUser.weight}',
                '${this.defaultPlanId}',
                '${newUser.role}',
                '${newUser.gender}'
            );
        `)
    }    

    public async deleteUserById(id: number) {
        await Database.runQuery(`DELETE FROM User WHERE id = ${id}`);
    }

    public async getUserById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT * FROM User WHERE id = ${id}`
        );

        return user as DbUser;
    }

    public async getUserProfileDataById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT u.*, css.subscription_status
            FROM user u
            JOIN clientSubscriptionStatus css ON u.id = css.user_id
            WHERE u.id = ${id}`
        );

        return user as DbUser;
    }

    public async getClassesById(id: number): Promise<DbClass[]>  {
        let classes = await Database.runQuery(`
            SELECT 
                c.date,
                c.name,
                c.start_time,
                c.end_time,
                u2.firstname AS trainer_firstname,
                u2.lastname AS trainer_lastname
            FROM 
                user u1
            JOIN 
                classes c ON u1.areas_of_concentration = c.name
            JOIN 
                user u2 ON c.trainer_id = u2.id AND u2.areas_of_concentration = u1.areas_of_concentration
            WHERE 
                u1.id = ${id}`
        );   
        
        return classes as DbClass[]
    }

    public async getUsers(): Promise<DbUser[]> {
        const users = await Database.runQuery(`
            SELECT * FROM User;`
        );

        return users as DbUser[];
    }

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
 

    public async updateUserById(user: DbUser) {
        const { 
            id, 
            firstname, 
            lastname, 
            email, 
            phone_number, 
            date_of_birth, 
            areas_of_concentration, 
            weight, 
            plan_id,
            gender
        } = user;
        
        await Database.runQuery(`
            UPDATE Client 
            SET
                firstname = '${firstname}',
                lastname = '${lastname}',
                email = '${email}',
                phone_number = '${phone_number}',
                date_of_birth = '${date_of_birth}',
                areas_of_concentration = '${areas_of_concentration}',
                weight = '${weight}',
                plan_id = '${plan_id}',
                gender = '${gender}'

            WHERE id = ${id}
        `);
    }

    public async getUserByEmail(email: string): Promise<DbUser> {
        const user = await Database.runQuery<DbUser[]>(`
            SELECT * FROM User
            WHERE email = '${email}'
        `);  

        return user[0];
    }

    public async getClassById(id: number): Promise<DbClass>  {
        let classe = await Database.runQuery(`
            SELECT * FROM Classes WHERE id = ${id}`
        );

        return classe as DbClass;
    }

    public async getClasses(): Promise<DbClass[]>  {
        let classes = await Database.runQuery(`
            SELECT * FROM Classes`
        );

        return classes as DbClass[];
    }
}