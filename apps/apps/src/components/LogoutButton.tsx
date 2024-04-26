import { signOut } from "@/utils/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        }
        }
    >
        <button type="submit">Signout</button>
    </form>
    );
}