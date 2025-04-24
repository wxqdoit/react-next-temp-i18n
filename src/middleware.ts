import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { FALLBACK_LNG, LANGUAGES} from '@/constants';

acceptLanguage.languages(LANGUAGES);

export const config = {
	// matcher: '/:lng*'
	matcher: ['/((?!api|_next/static|robots|sitemap|images|_next/image|assets|favicon.ico|sw.js).*)']
};

export function middleware(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams.toString();
	let lng;
	lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	if (!lng) lng = FALLBACK_LNG;
	// Redirect if lng in path is not supported
	if (
		!LANGUAGES.some((loc: any) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith('/_next')
	) {
		const redirectUrl = `/${lng}${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}${searchParams ? '?' + searchParams : ''}`;
		return NextResponse.redirect(
			new URL(redirectUrl, req.url)
		);
	}

	return NextResponse.next();
}
