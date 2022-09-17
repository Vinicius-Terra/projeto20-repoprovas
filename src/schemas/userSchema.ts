import joi from 'joi';
import {SignUpUserData, SignInUserData} from "../types/userTypes"

// email checking the IANA list
export const signUpSchema = joi.object<SignUpUserData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})

export const signInSchema = joi.object<SignInUserData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});
