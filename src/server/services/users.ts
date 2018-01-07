
import { EntityManager, getManager } from 'typeorm';
import { User } from '../entities/users';

export const getAllUsers = async (manager: EntityManager) => {
    const usersRepository = manager.getRepository(User);
    return await usersRepository.find();
};

export const getUserById = async (manager: EntityManager, id: number) => {
    const usersRepository = manager.getRepository(User);
    return await usersRepository.findOneById(id);
};

export const getUserByEmail = async (manager: EntityManager, email: string) => {
    const usersRepository = getManager().getRepository(User);

    return usersRepository
        .createQueryBuilder('user')
        .where('user.email = :email', {email: email.toLowerCase()})
        .getOne();
};

export const getUserByGoogleId = async (manager: EntityManager, google: string) => {
    const usersRepository = getManager().getRepository(User);

    return usersRepository
        .createQueryBuilder('user')
        .where('user.email = :email', {google})
        .getOne();
};

export const createUserWithEmailAndPassword = async (manager: EntityManager, google: string) => {
    const usersRepository = getManager().getRepository(User);

    return usersRepository
        .createQueryBuilder('user')
        .where('user.email = :email', {google})
        .getOne();
};