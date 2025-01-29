import CredentialsProvider from "next-auth/providers/credentials";

export const NextAuthConfig = {
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:"email",type:"text",placeholder:"example@gmail.com"},
                password:{label:"password",type:"password"},
            },
            async authorize(credentials, req) {
                return null;
            },
        })
    ]
}