import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { getAllUsers, getUserByEmail } from '../services/users';

const request = require('express-validator');

export async function userSignUp(req: Request, res: Response, next: NextFunction) {

    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len({min: 4});
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }

    const email = req.body.email;

    await getManager().transaction(async transactionalEntityManager => {

        try {
            const existingUser = await getUserByEmail(transactionalEntityManager, email);

            if (existingUser) {
                req.flash('errors', {msg: 'Account with that email address already exists.'});
                return res.redirect('/signup');
            }


        }
    })


    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists.'});
            return res.redirect('/signup');
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
}


export async function usersGetAllAction(request: Request, response: Response) {
    await getManager().transaction(async transactionalEntityManager => {
        const allUsers = await getAllUsers(transactionalEntityManager);
        response.send(allUsers);
    });
}