import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

/** 루트는 인트로로 리다이렉트한다. */
export default function Home() {
  redirect(ROUTES.intro);
}
