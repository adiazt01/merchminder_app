"use server";

import { signIn, signOut } from "@/utils/auth";

// Logout 
export async function Logout() {
  return await signOut()
}

// Login with Google
export async function LoginGoogle() {
  return await signIn("google", {
    redirectTo: "/dashboard"
  })
}