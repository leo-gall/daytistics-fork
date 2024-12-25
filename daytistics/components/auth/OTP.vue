<template>
    <div class="container mx-auto flex justify-center items-center">
        <form
            id="otp-form"
            class="flex flex-wrap justify-center gap-2 max-w-full"
        >
            <input
                v-for="(digit, index) in otpArray"
                :key="index"
                :ref="(el) => (inputRefs[index] = el)"
                type="text"
                maxlength="1"
                class="shadow-xs flex w-[47px] sm:w-[50px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-xl sm:text-2xl font-medium text-dark outline-none"
                :value="digit"
                @input="handleInput(index, $event.target.value)"
                @keydown="handleKeyDown($event, index)"
                @focus="handleFocus($event.target)"
                @paste="handlePaste($event)"
            />
        </form>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue', 'change']);

const otpArray = ref(Array(6).fill(''));
const inputRefs = ref([]);

// Watch for changes in the modelValue prop
watch(
    () => props.modelValue,
    (newValue) => {
        const stringValue = typeof newValue === 'string' ? newValue : '';
        otpArray.value = stringValue.split('').concat(Array(6 - stringValue.length).fill(''));
    },
    { immediate: true }
);

const updateModelValue = () => {
    const newValue = otpArray.value.join('').trim();
    emit('update:modelValue', newValue);
    emit('change', newValue);
};

const handleKeyDown = (e, index) => {
    if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
    ) {
        e.preventDefault();
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (otpArray.value[index] !== '') {
            otpArray.value[index] = '';
        } else if (index > 0) {
            otpArray.value[index - 1] = '';
            inputRefs.value[index - 1].focus();
        }
        updateModelValue();
    }
};

const handleInput = (index, value) => {
    otpArray.value[index] = value;
    if (value && index < otpArray.value.length - 1) {
        inputRefs.value[index + 1].focus();
    }
    updateModelValue();
};

const handleFocus = (target) => {
    target.select();
};

const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').trim();
    const numericText = text.replace(/\D/g, '').slice(0, 6);
    otpArray.value = numericText.split('').concat(Array(6 - numericText.length).fill(''));
    updateModelValue();
    // Focus on the next empty input or the last input
    const nextEmptyIndex = otpArray.value.findIndex((digit) => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.value[focusIndex].focus();
};

onMounted(() => {
    // Focus the first input when the component is mounted
    if (inputRefs.value[0]) {
        inputRefs.value[0].focus();
    }
});
</script>
