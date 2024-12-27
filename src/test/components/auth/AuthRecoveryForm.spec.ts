import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it } from 'vitest';
import AuthRecoveryForm from '~/components/auth/AuthRecoveryForm.vue';

describe('AuthRecoveryForm', () => {
    it('matches snapshot (recovery stage 1)', async () => {
        const wrapper = await mountSuspended(AuthRecoveryForm);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot (recovery stage 2)', async () => {
        const wrapper = await mountSuspended(AuthRecoveryForm, {
            attrs: {
                'data-test-stage': '2',
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
