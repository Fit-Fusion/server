import Database from '../Database.js';
import { DbUser, User } from '../abstracts/Interfaces.js';

export default class UserResource {
    public async addUser(newUser: User): Promise<void> {
        const defaultPassword = '1234';
        const defaultPlanId = 1;

        await Database.runQuery(`
            INSERT INTO User (
                firstname,
                lastname, 
                password, 
                email, 
                phone_number, 
                age,
                area_of_concentration, 
                weight,
                height,
                plan_id,
                role,
                gender
            ) VALUES ( 
                '${newUser.firstname}', 
                '${newUser.lastname}', 
                '${defaultPassword}',
                '${newUser.email}',
                '${newUser.phoneNumber}',
                '${newUser.age}', 
                '${newUser.areaOfConcentration}',
                '${newUser.weight}',
                '${newUser.height}',
                '${defaultPlanId}',
                '${newUser.role}',
                '${newUser.gender}'
            );
        `)
    }

    public async deleteUser(id: number) {
        await Database.runQuery(`DELETE FROM User WHERE id = ${id}`);
    }

    public async getUserById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT * FROM User WHERE id = ${id}`
        );

        return user as DbUser;
    }

    public async getClientProfileDataById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT u.*, css.subscription_status
            FROM user u
                JOIN clientSubscriptionStatus css ON u.id = css.client_id
            WHERE u.id = ${id}`
        );

        return user as DbUser;
    }

    public async getTrainerProfileDataById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT *
            FROM user
            WHERE role = 'trainer' AND id = ${id}`
        );

        return user as DbUser;
    }

    public async getAdminProfileDataById(id: number): Promise<DbUser>  {
        let user = await Database.runQuery(`
            SELECT *
            FROM user
            WHERE role = 'admin' AND id = ${id}`
        );

        return user as DbUser;
    }

    public async getUsers(): Promise<DbUser[]> {
        const users = await Database.runQuery(`
            SELECT * FROM User;`
        );

        return users as DbUser[];
    }

    public async updateUserProfileData(user: DbUser) {
        const { 
            id, 
            firstname, 
            lastname, 
            phone_number, 
            age, 
            weight,
            height,
            gender
        } = user;
        
        await Database.runQuery(`
            UPDATE User 
            SET
                firstname = '${firstname}',
                lastname = '${lastname}',
                phone_number = '${phone_number}',
                age = '${age}',
                weight = '${weight}',
                height = '${height}',
                gender = '${gender}'

            WHERE id = ${id}
        `);
    }

    public async updateAdminProfileData(admin: any) {
        const { 
            id, 
            firstname, 
            lastname, 
            phone_number,  
            email,
            password
        } = admin;
        
        await Database.runQuery(`
            UPDATE User 
            SET
                firstname = '${firstname}',
                lastname = '${lastname}',
                phone_number = '${phone_number}',
                email = '${email}',
                password = '${password}'

            WHERE id = ${id}
        `);
    }

    public async updateUserEmailPassword(user: any) {
        const { 
            id, 
            email,
            password
        } = user;
        
        await Database.runQuery(`
            UPDATE User 
            SET
                email = '${email}',
                password = '${password}'
                
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

    public async updateUserSubscriptionStatus(user: User) {
        const { id } = await this.getUserByEmail(user.email);
        const defaultStatus = 'Inactive';

        await Database.runQuery(`
            INSERT INTO clientSubscriptionStatus(
                client_id,
                subscription_status
            ) VALUES (
                '${id}',
                '${defaultStatus}'
            )
        `);
    }
}