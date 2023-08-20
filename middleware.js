import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("setUserInfoAfterLogin");
  let url = req.url;
  if (
    verify &&
    (url === "http://localhost:3001/login" ||
      url === "http://localhost:3001/register" ||
      url === "http://localhost:3001/")
  ) {
    return NextResponse.redirect("http://localhost:3001/eg/products");
  }
  if (
   !verify &&
    (url.includes("/eg")||
      url.includes("/sa") ||
      url.includes("/ae"))
  ) {
    return NextResponse.redirect("http://localhost:3001/login");
  }
  if (!verify && url === "http://localhost:3001/") {
    return NextResponse.redirect("http://localhost:3001/login");
  }
}
