import Database from '../Database.js';
import { DbUser, User } from '../abstracts/Interfaces.js';

export default class UserResource {
    public async addUser(newUser: User) {
        const defaultPassword = 'password';
        const defaultPlanId = 1;

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
                '${defaultPassword}',
                '${newUser.email}',
                '${newUser.phoneNumber}',
                '${newUser.dateOfBirth}', 
                '${newUser.areasOfConcentration}',
                '${newUser.weight}',
                '${defaultPlanId}',
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

    public async getUsers(): Promise<DbUser[]> {
        const users = await Database.runQuery(`
            SELECT * FROM User;`
        );

        return users as DbUser[];
    }

    public async updateUser(user: DbUser) {
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
}