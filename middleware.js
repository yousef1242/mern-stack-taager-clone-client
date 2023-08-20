import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("setUserInfoAfterLogin");
  let url = req.url;
  if (
    verify &&
    (url === "https://mern-stack-taager-clone-client.vercel.app/login" ||
      url === "https://mern-stack-taager-clone-client.vercel.app/register" ||
      url === "https://mern-stack-taager-clone-client.vercel.app/")
  ) {
    return NextResponse.redirect("https://mern-stack-taager-clone-client.vercel.app/eg/products");
  }
  if (
   !verify &&
    (url.includes("/eg")||
      url.includes("/sa") ||
      url.includes("/ae"))
  ) {
    return NextResponse.redirect("https://mern-stack-taager-clone-client.vercel.app/login");
  }
  if (!verify && url === "https://mern-stack-taager-clone-client.vercel.app/") {
    return NextResponse.redirect("https://mern-stack-taager-clone-client.vercel.app/login");
  }
}
