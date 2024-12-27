<template>
    <div class="bg-white p-4 rounded-lg shadow-lg">
        <!-- Week Navigation -->
        <div class="flex items-center justify-between mb-6">
            <button
                @click="previousWeek"
                class="text-green-600 hover:text-green-700"
            >
                <ChevronLeftIcon class="h-5 w-5" />
            </button>
            <h2 class="text-lg font-semibold text-gray-800">
                {{ formatDateRange(weekDays[0], weekDays[weekDays.length - 1]) }}
            </h2>
            <button
                @click="nextWeek"
                class="text-green-600 hover:text-green-700"
            >
                <ChevronRightIcon class="h-5 w-5" />
            </button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-8 gap-[1px] bg-gray-100">
            <!-- Time Column -->
            <div class="bg-white">
                <div class="h-14"></div>
                <!-- Header spacing -->
                <div
                    v-for="hour in hours"
                    :key="hour"
                    class="h-12 pr-2 flex items-center justify-end"
                >
                    <span class="text-xs text-gray-500">{{ formatHour(hour) }}</span>
                </div>
            </div>

            <!-- Days Columns -->
            <div
                v-for="day in weekDays"
                :key="day.toISOString()"
                class="bg-white"
            >
                <!-- Day Header -->
                <div class="h-14 flex flex-col items-center justify-center border-b">
                    <span class="text-sm text-gray-600">{{ formatDay(day) }}</span>
                    <span
                        class="text-lg font-semibold"
                        :class="{
                            'text-green-600': isToday(day),
                            'text-gray-800': !isToday(day),
                        }"
                        >{{ day.getDate() }}</span
                    >
                </div>

                <!-- Time Slots -->
                <div
                    v-for="hour in hours"
                    :key="`${day.toISOString()}-${hour}`"
                    class="h-12 border-b border-gray-50 relative transition-colors duration-300"
                    :class="{ 'bg-red-100': isHighlighted(day, hour) }"
                    @mousedown="startTimeSelection(day, hour, $event)"
                    @mouseover="updateTimeSelection(day, hour)"
                    @mouseup="endTimeSelection"
                >
                    <!-- Selected Time Range -->
                    <div
                        v-if="isInSelectedRange(day, hour)"
                        class="absolute inset-0 bg-green-100 border-l-2 border-green-500"
                    ></div>
                </div>
            </div>
        </div>

        <!-- Selected Time Display -->
        <div
            v-if="selectedStart && selectedEnd"
            class="mt-4 p-3 bg-green-50 rounded-md"
        >
            <p class="text-sm text-green-800">
                Selected: {{ formatDate(selectedStart.day) }} {{ formatHour(selectedStart.hour) }} -
                {{ formatHour(selectedEnd.hour) }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

// State
const currentDate = ref(new Date());
const selecting = ref(false);
const selectedStart = ref(null);
const selectedEnd = ref(null);
const highlightedCells = ref(new Set());

// Time range
const hours = Array.from({ length: 24 }, (_, i) => i);

// Computed
const weekDays = computed(() => {
    const days = [];
    const startOfWeek = new Date(currentDate.value);
    // Adjust to Monday start
    const currentDay = currentDate.value.getDay();
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    startOfWeek.setDate(currentDate.value.getDate() + diff);

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        days.push(day);
    }
    return days;
});

// Methods
const formatHour = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
};

const formatDay = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDateRange = (start, end) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return `${startStr} - ${endStr}`;
};

const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

const previousWeek = () => {
    currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() - 7));
};

const nextWeek = () => {
    currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + 7));
};

const startTimeSelection = (day, hour, event) => {
    selecting.value = true;
    selectedStart.value = { day, hour };
    selectedEnd.value = { day, hour };

    // Track initial click position
    const initialX = event.clientX;
    const initialY = event.clientY;

    // After a brief delay, check if it was a click (no drag)
    setTimeout(() => {
        if (selecting.value) {
            const currentX = event.clientX;
            const currentY = event.clientY;
            const distance = Math.sqrt(
                Math.pow(currentX - initialX, 2) + Math.pow(currentY - initialY, 2)
            );

            // If mouse hasn't moved significantly, treat as click
            if (distance < 5) {
                const cellId = `${day.toISOString()}-${hour}`;
                highlightedCells.value.add(cellId);

                // Remove highlight after 1 second
                setTimeout(() => {
                    highlightedCells.value.delete(cellId);
                }, 1000);
            }
        }
    }, 100);
};

const updateTimeSelection = (day, hour) => {
    if (selecting.value && selectedStart.value.day === day) {
        selectedEnd.value = { day, hour };
    }
};

const endTimeSelection = () => {
    selecting.value = false;
    if (selectedEnd.value.hour < selectedStart.value.hour) {
        const temp = selectedStart.value.hour;
        selectedStart.value.hour = selectedEnd.value.hour;
        selectedEnd.value.hour = temp;
    }
};

const isInSelectedRange = (day, hour) => {
    if (!selectedStart.value || !selectedEnd.value) return false;
    if (day.toDateString() !== selectedStart.value.day.toDateString()) return false;

    const startHour = Math.min(selectedStart.value.hour, selectedEnd.value.hour);
    const endHour = Math.max(selectedStart.value.hour, selectedEnd.value.hour);

    return hour >= startHour && hour <= endHour;
};

const isHighlighted = (day, hour) => {
    return highlightedCells.value.has(`${day.toISOString()}-${hour}`);
};
</script>

<style scoped>
/* Prevent text selection while dragging */
.calendar {
    user-select: none;
}
</style>
