import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = (event) => {
  if (event.locals.user) {
    return redirect(302, '/library');
  }
  return {};
};

export const actions: Actions = {
  signInEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return fail(400, { message: 'Email and password are required' });
    }

    try {
      await auth.api.signInEmail({
        body: { email, password },
        headers: event.request.headers
      });
    } catch (e) {
      if (e instanceof APIError) {
        return fail(400, { message: e.message });
      }
      throw e;
    }

    return redirect(302, '/library');
  },

  signUpEmail: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
      return fail(400, { message: 'Name, email and password are required' });
    }

    try {
      await auth.api.signUpEmail({
        body: { name, email, password },
        headers: event.request.headers
      });
    } catch (e) {
      if (e instanceof APIError) {
        return fail(400, { message: e.message });
      }
      throw e;
    }

    return redirect(302, '/library');
  }
};
