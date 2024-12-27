<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:p-6">
        <AutoCompleteInput :items="people.values" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
} from '@headlessui/vue';
import { Check, ChevronsUpDown } from 'lucide-vue-next';

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

let selected = ref(people[0]);
let query = ref('');

let filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) =>
              person.name
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .includes(query.value.toLowerCase().replace(/\s+/g, ''))
          )
);
</script>
