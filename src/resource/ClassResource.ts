import Database from '../Database.js';
import { DbClass } from '../abstracts/Interfaces.js';

export default class ClassResource {    
    public async getClassesById(id: number): Promise<DbClass[]>  {
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
                classes class ON client.areas_of_concentration = class.name
            JOIN 
                user trainer ON class.trainer_id = trainer.id
            WHERE 
                client.id = ${id}`
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