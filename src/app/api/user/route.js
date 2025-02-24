import { auth } from "@/auth";
import { getUsersByEmail } from "@/queries/users";

export async function GET(req) {
    const session = await auth();

    if (!session?.user?.email) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await getUsersByEmail(session.user.email);
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
}
