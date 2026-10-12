import { getMe } from "@/service/getMe";
import Navbar from "@/components/shared/navbar";

export async function CurrentUserNavbar() {
  const user = await getMe();

  return <Navbar user={user ?? null} />;
}