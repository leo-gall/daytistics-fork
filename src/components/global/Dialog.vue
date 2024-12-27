<template>
    <Transition
        name="dialog-fade"
        appear
    >
        <Dialog
            v-if="open"
            :open="open"
            class="relative z-50"
            :aria-label="description"
            size="md"
            :title="title"
        >
            <Transition
                name="dialog-backdrop"
                appear
            >
                <div
                    class="fixed inset-0 bg-gray-900 opacity-50 z-40"
                    aria-hidden="true"
                ></div>
            </Transition>

            <div
                class="fixed inset-0 flex w-screen items-center justify-center p-4 z-50"
                @mousedown="handleOutsideClick"
            >
                <Transition
                    name="dialog-content"
                    appear
                >
                    <DialogPanel
                        class="w-full shadow-md rounded-xl bg-white p-5 dialog-content"
                        :class="`max-w-${size} min-w-${size}`"
                    >
                        <div class="flex flex-row justify-between items-center">
                            <DialogTitle class="font-semibold text-xl">{{ title }}</DialogTitle>

                            <button
                                aria-label="Close dialog"
                                type="button"
                                @click="closeDialog"
                            >
                                <X />
                            </button>
                        </div>
                        <div class="mt-3">
                            <slot />
                        </div>
                    </DialogPanel>
                </Transition>
            </div>
        </Dialog>
    </Transition>
</template>

<script lang="ts" setup>
import { Dialog, DialogTitle, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { X } from 'lucide-vue-next';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    title: string;
    open: boolean;
    size: 'sm' | 'md' | 'lg';
    description?: string;
}>();

const emit = defineEmits(['close']);

function closeDialog() {
    emit('close');
}

onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);

    if (import.meta.dev && !props.description) {
        console.warn(
            "Please provide a description prop to the Dialog component. This description will be used as the dialog's aria-label. Aria-labels are mandatory from the end of June 2025."
        );
    }
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
    closeDialog();
});

function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        closeDialog();
    }
}

function handleOutsideClick(event: MouseEvent) {
    // Check if the click target is the backdrop itself
    if (event.target === event.currentTarget) {
        const dialogContent = (event.currentTarget as Element).querySelector('.dialog-content');
        if (event.button === 0 && dialogContent && !dialogContent.contains(event.target as Node)) {
            closeDialog();
        }
    }
}
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active,
.dialog-backdrop-enter-active,
.dialog-backdrop-leave-active,
.dialog-content-enter-active,
.dialog-content-leave-active {
    transition: all 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
}

.dialog-backdrop-enter-from,
.dialog-backdrop-leave-to {
    opacity: 0;
}

.dialog-content-enter-from,
.dialog-content-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
