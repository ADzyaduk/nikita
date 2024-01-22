

<template>
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-2">
            <div class="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                <div class="max-w-xl mb-6">
                    <h2
                        class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-300 sm:text-4xl sm:leading-none">
                        Механизированная покраска<br class="hidden md:block" />
                        <span class="inline-block text-deep-purple-accent-400"></span>
                    </h2>
                    <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg">
                        Мы предлагаем качественное механизированное окрашивание поверхностей. Наша команда использует
                        современное оборудование и материалы для обеспечения высокого качества покрытия.
                    </p>
                </div>
                <BtnSlideover />
            </div>
            <div class="flex items-center justify-center -mx-4 lg:pl-8">
                <div class="flex flex-col items-end px-3">
                    <img class="object-cover mb-6 rounded shadow-xl h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                        src="~/assets/115.jpg" alt="" />
                    <img class="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                        src="~/assets/114.jpg" alt="" />
                </div>
                <div class="px-3">
                    <img class="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                        src="~/assets/113.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
