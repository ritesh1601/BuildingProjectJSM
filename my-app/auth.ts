import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, profile }) {
            const { name, email, image } = user
            const { id, login, bio } = profile

            try {
                const existingUser = await client.withConfig({ useCdn: false }).fetch(
                    AUTHOR_BY_GITHUB_ID_QUERY,
                    { id }
                )

                if (!existingUser) {
                    await writeClient.create({
                        _type: "author",
                        id,
                        name,
                        username: login,
                        email,
                        image,
                        bio: bio || "",
                    })
                }
                return true
            } catch (error) {
                console.error("SignIn error:", error)
                return false // Return false to deny access in case of error
            }
        },

        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    const user = await client.withConfig({ useCdn: false }).fetch(
                        AUTHOR_BY_GITHUB_ID_QUERY,
                        { id: profile.id }
                    )
                    token.id = user?.id
                } catch (error) {
                    console.error("JWT error:", error)
                }
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        }
    }
})