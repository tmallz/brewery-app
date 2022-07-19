import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

const publicPages = ['/'];

export const handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  event.locals.userid = cookies.userid || uuid();

  const response = await resolve(event);

  if (!cookies.userid) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookie.serialize('userid', event.locals.userid, {
        path: '/',
        httpOnly: true,
      })
    );
  }

  return response;
};

// import * as cookie from 'cookie'
// // Pages allowed to visit without authentication
// const publicPages = ['/', '/api']

// # Could be an async function. No limitation here.
// function verifyToken(token) {
//     if (token === 'haha') {
//         return true
//     }
//     return false
// }

// export async function handle({ request, render }) {
//     const { token } = cookie.parse(request.headers.cookie || '');
//     if (token) {
//         request.locals.isLoggedIn = verifyToken(token)
//     } else {
//         request.locals.isLoggedIn = false
//     }
//     const response = await render(request);
//     if (!request.locals.isLoggedIn && !publicPages.includes(request.path)) {
//      // If you are not logged in and you are not on a public page,
//      // it just redirects you to the main page, which is / in this case.
//         return {
//             status: 301,
//             headers: {
//                 location: '/'
//             }
//         };
//     }
//     return {
//         ...response
//     }
// }
