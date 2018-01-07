import * as Promise from 'bluebird';
import * as bcryptNode from 'bcrypt-nodejs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const bcrypt = Promise.promisifyAll(bcryptNode);

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    hashedPassword: string;

    @Column()
    google: string;
}

export const checkPassword = (user: User, candidatePassword: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.hashedPassword, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
