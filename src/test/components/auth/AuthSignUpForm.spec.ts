import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it } from 'vitest';
import AuthSignUpForm from '~/components/auth/AuthSignUpForm.vue';

describe('AuthSignUpForm', () => {
    it('matches snapshot', async () => {
        const wrapper = await mountSuspended(AuthSignUpForm);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
