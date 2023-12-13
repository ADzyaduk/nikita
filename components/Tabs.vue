<script setup>


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

</script>

<template>
    <div>
        <p
            class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-5 lg:py-2 text-center font-semibold">
            Мы предлагаем качественное окрашивание стен, потолков и других поверхностей с применением современных методов
            нанесения краски. Пожалуйста, ознакомьтесь с нашими ценами на услуги в Казани на 2024 год.
        </p>

        <UTabs :items="items" class="w-full mb-20 lg:mb-16">
            <template #item="{ item }">
                <UCard>
                    <table class="table-fixed w-full ">
                        <thead>
                            <tr>
                                <th class="text-center border-2 border-lime-500 dark:border-indigo-500">Наименование услуги
                                </th>
                                <th class="text-center border-2 border-lime-500 dark:border-indigo-500">Цена</th>
                                <th class="text-center border-2 border-lime-500 dark:border-indigo-500">Единица измерения
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="price in prices[item.key]" :key="price.name">
                                <td class="text-center border border-lime-500 dark:border-indigo-500">{{ price.name }}</td>
                                <td class="text-center border border-lime-500 dark:border-indigo-500">{{ price.price }}</td>
                                <td class="text-center border border-lime-500 dark:border-indigo-500">{{ price.unit }}</td>
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
