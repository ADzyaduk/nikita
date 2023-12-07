<script setup>
import { ref, computed, watch } from 'vue';

const items = [
    {
        key: 'prom',
        label: 'Промышленные помещения',
    },
    {
        key: 'kom',
        label: 'Коммерческие помещения',
    },
    {
        key: 'private',
        label: 'Частные дома и квартиры',
    },
];

const prices = {
    prom: [
        { name: 'Частичная шпаклевка царапин, сколов на стенах', price: 150, unit: 'м²' },
        { name: 'Грунтование стен', price: 50, unit: 'м²' },
        { name: 'Покраска стен (один слой)', price: 130, unit: 'м²' },
        { name: 'Покраска стен в 2 слоя', price: 200, unit: 'м²' },
        { name: 'Покраска потолка (один слой)', price: 150, unit: 'м²' },
        { name: 'Покраска потолка (2 слоя)', price: 250, unit: 'м²' },
        { name: 'Покраска металлоконструкций', price: 100, unit: 'п.м' },
    ],
    kom: [
        { name: 'Освежить ранее окрашенные стены', price: 120, unit: 'м²' },
        { name: 'Частичная шпаклевка царапин, сколов на стенах', price: 150, unit: 'м²' },
        { name: 'Обеспыливание стен', price: 50, unit: 'м²' },
        { name: 'Грунтование стен', price: 50, unit: 'м²' },
        { name: 'Покраска обоев', price: 150, unit: 'м²' },
        { name: 'Покраска стен (один слой)', price: 120, unit: 'м²' },
        { name: 'Покраска стен в 2 слоя', price: 180, unit: 'м²' },
        { name: 'Покраска потолка (один слой)', price: 150, unit: 'м²' },
        { name: 'Покраска потолка (2 слоя)', price: 250, unit: 'м²' },
    ],
    private: [
        { name: 'Освежить ранее окрашенные стены', price: 150, unit: 'м²' },
        { name: 'Частичная шпаклевка царапин, сколов на стенах', price: 150, unit: 'м²' },
        { name: 'Обеспыливание стен', price: 50, unit: 'м²' },
        { name: 'Грунтование стен', price: 50, unit: 'м²' },
        { name: 'Покраска стен (один слой)', price: 150, unit: 'м²' },
        { name: 'Покраска стен в 2 слоя', price: 180, unit: 'м²' },
        { name: 'Покраска потолка (один слой)', price: 150, unit: 'м²' },
        { name: 'Покраска потолка (2 слоя)', price: 250, unit: 'м²' },
    ],
};

const selectedTab = ref(items[0].key);
const selectedServices = ref([]);

function toggleService(service) {
    const index = selectedServices.value.findIndex((item) => item.name === service.name);
    if (index === -1) {
        selectedServices.value.push(service);
    } else {
        selectedServices.value.splice(index, 1);
    }
}

const totalSum = computed(() => {
    return selectedServices.value.reduce((sum, service) => sum + service.price, 0);
});

watch(selectedTab, () => {
    selectedServices.value = [];
});


</script>

<template>
    <div>
        <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg">
            Мы предоставляем профессиональное окрашивание стен, потолков и различных элементов путем машинного нанесения.
            Предлагаем ознакомиться с ценовой таблицей на наши виды в городе Казань на 2024 г.
        </p>

        <UTabs :items="items" v-model="selectedTab" class="w-full mb-14">
            <template #item="{ item }">
                <UCard>
                    <table class="table-fixed w-full">
                        <thead>
                            <tr>
                                <th class="text-center">Наименование услуги</th>
                                <th class="text-center">Цена</th>
                                <th class="text-center">Единица измерения</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="price in prices[item.key]" :key="price.name"
                                :class="{ 'bg-gray-300 dark:bg-lime-900': selectedServices.some((service) => service.name === price.name) }"
                                @click="toggleService(price)">
                                <td class="text-center">{{ price.name }}</td>
                                <td class="text-center">{{ price.price }}</td>
                                <td class="text-center">{{ price.unit }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="mt-4">
                        <ComonServices />
                        <CoveringServices />
                        <p class="text-lg font-semibold">Выбранные услуги:</p>
                        <ul>
                            <li v-for="service in selectedServices" :key="service.name">
                                {{ service.name }} - {{ service.price }} {{ service.unit }}
                            </li>
                        </ul>
                        <p class="text-lg font-semibold mt-2">Итого: {{ totalSum }} руб.</p>
                    </div>
                </UCard>
            </template>
        </UTabs>
    </div>
</template>
