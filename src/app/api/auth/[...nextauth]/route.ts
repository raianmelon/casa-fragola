import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcrypt";

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/cms/login',
    },

    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                email: { },
                password: { }
            },

            async authorize(credentials, req) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(8)})
                    .safeParse(credentials)

                if(parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;

                    const AdminUser = {email: process.env.ADMIN_EMAIL as string, password: process.env.ADMIN_PASSWORD as string }

                    const bcrypt = require ('bcrypt');

                    bcrypt.hash(AdminUser.password, 10, (err: any, hash: any) => {
                        console.log(hash);
                    });

                    const comparePassword = bcrypt.compare(password, AdminUser.password)

                    if(AdminUser.email == email && comparePassword) {
                        console.log({ message: 'success' });
                        return {
                            id: "1",
                            email: AdminUser.email
                        };
                    }

                    return null
                }

                return null
            }
        })
    ],

})

export { handler as GET, handler as POST }