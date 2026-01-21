import { sql } from "@/lib/db";
import { UserFromDB } from "@/app/types";

export const getUser = async (
  userId: string,
): Promise<undefined | UserFromDB> => {
  const [user] = await sql`SELECT * FROM users WHERE user_id = ${userId}`;

  return user as UserFromDB;
};
