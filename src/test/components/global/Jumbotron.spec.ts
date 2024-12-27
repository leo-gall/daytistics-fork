import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, describe, it } from 'vitest';
import Jumbotron from '~/components/global/Jumbotron.vue';

describe('Jumbotron', () => {
    it('matches snapshot without Slots', async () => {
        const wrapper = await mountSuspended(Jumbotron, {
            props: {
                title: 'Jumbotron Title',
                subtitle: 'Jumbotron Subtitle',
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot with Slots', async () => {
        const wrapper = await mountSuspended(Jumbotron, {
            props: {
                title: 'Jumbotron Title',
                subtitle: 'Jumbotron Subtitle',
            },
            slots: {
                default: 'Jumbotron Content',
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    it.each([250, 500, 750, 1000])('matches snapshot with AutoTyping', async (timeout) => {
        const wrapper = await mountSuspended(Jumbotron, {
            props: {
                title: 'Jumbotron Title',
                subtitle: 'Jumbotron Subtitle',
                typingTexts: ['Jumbotron Typing Text 1', 'Jumbotron Typing Text 2'],
            },
        });

        await new Promise((resolve) => setTimeout(resolve, timeout));

        expect(wrapper.html()).toMatchSnapshot();
    });
});
