<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
const activeTab = ref($context.params.tabKey || 'prom');

const onTabChange = (tabKey) => {
    $context.router.push({ params: { tabKey } });
};

onMounted(() => {
    // ваш текущий код, который выполнится при монтировании компонента
});

</script>

<template>
    <div>
        <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg">
            Мы предоставляем профессиональное окрашивание стен, потолков и различных элементов путем машинного нанесения.
            Предлагаем ознакомиться с ценовой таблицей на наши виды в городе Казань на 2024 г.
        </p>

        <UTabs :items="items" :activeTab="$route.params.tabKey" @change-tab="onTabChange" class="w-full mb-14">
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
                            <tr v-for="price in prices[item.key]" :key="price.name">
                                <td class="text-center">{{ price.name }}</td>
                                <td class="text-center">{{ price.price }}</td>
                                <td class="text-center">{{ price.unit }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="mt-4">
                        <ComonServices />
                        <CoveringServices />
                    </div>
                </UCard>
            </template>
        </UTabs>
    </div>
</template>
