/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (typeof window !== 'undefined') {
		// Perform localStorage action
		const token = localStorage.getItem('token');

		if (request.nextUrl.pathname.startsWith('/auth/register')) {
			if (!token) {
				return NextResponse.redirect(new URL('/auth/login', request.url));
			}
		}
		if (request.nextUrl.pathname.startsWith('/auth/login')) {
			if (token) {
				return NextResponse.redirect(new URL('/', request.url));
			}
		}
	}
	//   const token = localStorage.getItem('token');
	//   if (request.nextUrl.pathname.startsWith('/auth/register')) {
	//     if (!token) {
	//       return NextResponse.redirect(new URL('/auth/login', request.url));
	//     }
	//   }
	//   if(request.nextUrl.pathname.startsWith('/login')) {
	//     if (token) {
	//       return NextResponse.redirect(new URL('/preproduccion/layout', request.url));
	//     }
	//   }
	//   if(request.nextUrl.pathname.startsWith('/sign-up')) {
	//     if (token) {
	//       return NextResponse.redirect(new URL('/preproduccion/layout', request.url));
	//     }
	//   }
	//   if(request.nextUrl.pathname.startsWith('/preproduccion/layout')) {
	//     if (!token) {
	//       return NextResponse.redirect(new URL('/login', request.url));
	//     }
	//   }
}
