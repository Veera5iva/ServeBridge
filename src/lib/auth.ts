import { User } from "@/models/UserSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const NextAuthConfig = {
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                email:{label:"Email",type:"text",placeholder:"example@gmail.com"},
                password:{label:"Password",type:"password"}
            },
            //@ts-ignore
            async authorize(credentials:any){
                const user = await User.findOne(credentials.email);
                if(!user) throw new Error("User not found");
                if(!user.isVerified) throw new Error("User is not Verified");

                const validPassword = await bcrypt.compare(user.password,credentials.password);
                if(!validPassword) throw new Error("Invalid Password!");
                return {id:user._id,name:user.name,email:user.email,phone:user.phone,role:user.role}
            }
        })
    ],
    callbacks:{
        async jwt({token,user}:any){
            if(user){
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({session,token}:any){
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    },
    secret:process.env.NEXTAUTH_SECRET
}