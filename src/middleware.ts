import createMiddleware from "next-intl/middleware";
import {NextRequest, NextResponse} from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }

  if (pathname === "/fr/studio" || pathname.startsWith("/fr/studio/") || pathname === "/en/studio" || pathname.startsWith("/en/studio/")) {
    url.pathname = pathname.replace(/^\/(fr|en)\/studio/, "/studio");
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
