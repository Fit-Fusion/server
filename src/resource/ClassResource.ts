import Database from '../Database.js';
import { DbClass } from '../abstracts/Interfaces.js';

export default class ClassResource {    
    public async getClientClassesById(id: number): Promise<DbClass[]>  {
        let classes = await Database.runQuery(`
            SELECT 
                class.date,
                class.name,
                class.start_time,
                class.end_time,
                trainer.firstname AS trainer_firstname,
                trainer.lastname AS trainer_lastname
            FROM 
                user client
            JOIN 
                classes class ON client.area_of_concentration = class.name
            JOIN 
                user trainer ON class.trainer_id = trainer.id
            WHERE 
                client.id = ${id}`
        );   
        
        return classes as DbClass[]
    }

    public async getTrainerClassesById(id: number): Promise<DbClass[]>  {
        let classes = await Database.runQuery(`
            SELECT 
                classes.id as id,
                date,
                name,
                start_time,
                end_time
            FROM 
                classes
            JOIN 
                user trainer ON classes.name = trainer.area_of_concentration
            WHERE 
                trainer.id = ${id}`
        );   
        
        return classes as DbClass[]
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

    public async addClass(classObject: DbClass): Promise<void>  {
        await Database.runQuery(`
            INSERT INTO Classes (
                trainer_id,
                name, 
                description, 
                date, 
                start_time, 
                end_time
            ) VALUES ( 
                ${classObject.trainer_id},
                '${classObject.name}',
                '${classObject.description}',
                '${classObject.date}',
                '${classObject.start_time}',
                '${classObject.end_time}'
            );
        `)
    }

    public async updateClass(classObject: DbClass): Promise<void>  {
        const  {
            id,
            name,
            description,
            trainer_id,
            date,
            start_time,
            end_time
        } = classObject;

        await Database.runQuery(`
            UPDATE Classes SET
                trainer_id = ${trainer_id},
                name = '${name}',
                description = '${description}',
                date = '${date}',
                start_time = '${start_time}',
                end_time = '${end_time}'
            WHERE id = ${id}
        `)
    }

    public async deleteClass(id: number) {
        await Database.runQuery(`DELETE FROM Classes WHERE id = ${id}`);
    }
}