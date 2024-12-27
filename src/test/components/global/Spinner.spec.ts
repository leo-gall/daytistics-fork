import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it } from 'vitest';
import Spinner from '~/components/global/Spinner.vue';

describe('Spinner', () => {
    it('matches snapshot', async () => {
        const wrapper = await mountSuspended(Spinner);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
