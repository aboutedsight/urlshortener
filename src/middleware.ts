import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
        console.log("returning early");
        return;
    }
    console.log("Path??", req.nextUrl.pathname);

    const slug = req.nextUrl.pathname.split("/").pop();
    console.log("full next url", req.nextUrl)
    //can't use prisma here directly bc Next is in cloudfare here, so we need the other endpoint. 
    const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();
    console.log("data?", data);

    if (data?.url) {
        return NextResponse.redirect(data.url);
    }

}
// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest, ev: NextFetchEvent) {
//     const slug = req.nextUrl.pathname.split("/").pop();

//     const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
//     if (slugFetch.status === 404) {
//         return NextResponse.redirect(req.nextUrl.origin);
//     }
//     const data = await slugFetch.json();

//     if (data?.url) {
//         return NextResponse.redirect(data.url);
//     }
// }

// export const config = {
//     matcher: "/:slug",
// };