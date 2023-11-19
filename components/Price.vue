<template>
    <div class="pt-5" id="pricing">
        <div class="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-4xl text-center">
                <p class="mt-2 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-300 sm:text-3xl">Цены и Тарифы
                </p>
            </div>
            <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 dark:text-gray-300">Choose the
                product that works best
            </p>
            <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <!-- First Product -->
                <div class="ring-1 ring-lime-500  dark:ring-indigo-500 rounded-3xl p-8 xl:p-10">
                    <div class="flex items-center justify-between gap-x-4">
                        <h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300">
                            Комерческие помещения
                        </h2>
                    </div>
                    <p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1
                    </p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽
                            м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span>
                    </p>
                    <UButton color="lime" block class="mt-6">Button</UButton>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10">
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>40 units</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>1 feature</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                    </ul>
                </div>
                <!-- <div class="bg-white/5 ring-2 ring-indigo-500 rounded-3xl p-8 xl:p-10"> -->
                <!-- Second Product -->
                <div class="ring-1 ring-lime-500 dark:ring-indigo-500 rounded-3xl p-8 xl:p-10">
                    <div class="flex items-center justify-between gap-x-4">
                        <h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300">Частные
                            помещения
                        </h2>
                    </div>
                    <p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1
                    </p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽
                            м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span>
                    </p>
                    <UButton block color="lime" class="mt-6">Button</UButton>
                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10">
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>40 units</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>1 feature</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                    </ul>
                </div>

                <!-- Third Product -->
                <div class="ring-1 ring-lime-500 dark:ring-indigo-500 rounded-3xl p-8 xl:p-10">
                    <div class="flex items-center justify-between gap-x-4">
                        <h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300">
                            Промышленные помещения
                        </h2>
                    </div>
                    <p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1
                    </p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽
                            м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span>
                    </p>
                    <UButton color="lime" block class="mt-6">Button</UButton>

                    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10">
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>40 units</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>1 feature</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                        <li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white">
                                <path fill-rule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clip-rule="evenodd"></path>
                            </svg>Fast delivery</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
