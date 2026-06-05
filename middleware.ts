export { default } from "next-auth/middleware";

export const config = {
  // Prompt detail pages are sign-in only, same as the profile page.
  matcher: ["/profile", "/prompt/:path*"],
};

