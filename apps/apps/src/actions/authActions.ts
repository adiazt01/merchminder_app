"use server";

import { signOut } from "@/utils/auth";

export async function Logout() {
  return await signOut()
}
