import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it, vi } from 'vitest';
import AuthSignInForm from '~/components/auth/AuthSignInForm.vue';
import AutoTyping from '~/components/global/AutoTyping.vue';

describe('AutoTyping', () => {
    it.each([0, 250, 500, 750, 1000])('matches snapshot', async (timeout) => {
        const wrapper = await mountSuspended(AutoTyping, {
            props: {
                texts: ['AutoTyping Text 1', 'AutoTyping Text 2'],
            },
        });

        await new Promise((resolve) => setTimeout(resolve, timeout));

        expect(wrapper.html()).toMatchSnapshot();
    });
});
