import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";

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

                    const passwordMatches = await bcrypt.compare(password, AdminUser.password)

                    console.log(AdminUser.password)

                    if(AdminUser.email == email && passwordMatches) {
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