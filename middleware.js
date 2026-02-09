import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/shop(.*)',
  '/products(.*)',
  '/recipes(.*)',
  '/our-impact(.*)',
  '/vendors(.*)',
  '/contact(.*)',
  '/faq(.*)',
  '/api/products(.*)',
  '/api/recipes(.*)',
  '/api/reviews(.*)',
  '/api/contact(.*)',
  '/api/impact(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};