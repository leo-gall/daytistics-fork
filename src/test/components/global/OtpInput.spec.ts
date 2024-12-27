import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it } from 'vitest';
import OtpInput from '~/components/global/OtpInput.vue';

describe('OtpInput', () => {
    it('matches snapshot', async () => {
        const wrapper = await mountSuspended(OtpInput);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
