import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it, vi } from 'vitest';
import AuthSignInForm from '~/components/auth/AuthSignInForm.vue';

describe('AuthSignInForm', () => {
    it('matches snapshot', async () => {
        const wrapper = await mountSuspended(AuthSignInForm);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
