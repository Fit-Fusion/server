import Database from '../Database.js';
import { DbClass } from '../abstracts/Interfaces.js';

export default class ClassResource {    
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