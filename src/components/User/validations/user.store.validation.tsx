import { z } from "zod";
export const userStoreValidation = z.object({
    name : z.string({required_error : 'name is required'}).min(3).max(100, {message : 'نام نمیتواند بیش از 100 حرف باشد'}),
    username : z.string().min(3).max(100, {message : 'نام کاربری نمیتواند بیش از 100 حرف باشد'}),
    email : z.string().email("please enter valid email."),
    website : z.string()
          .refine((value) => /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(value), 'Please enter valid website url')
});
