<script>
import axios from 'axios';


// const toast = useToast();

export default {
    data() {
        return {
            formData: {
                name: '',
                phone: '',
                text: '',
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(
                    `https://api.telegram.org/bot${'6849693417:AAEhtkyzlwPWpfcHucqmLS_jbiskfQNI7c0'}/sendMessage`,
                    {
                        chat_id: '-1002054840999',
                        text: `Имя: ${this.formData.name}\nТелефон: ${this.formData.phone}\nСообщение: ${this.formData.text}`,
                    }
                );

                if (response.status === 200) {
                    this.formData.name = '';
                    this.formData.phone = '';
                    this.formData.text = '';
                    // toast({ title: 'Сообщение отправлено!', variant: 'success' });
                } else {
                    console.error("Error sending message:", response);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    },
};
</script>






<style lang="scss" scoped>
</style>

<template>
    <!-- Container for demo purpose -->
    <div class="container my-24 mx-auto md:px-6">
        <!-- Section: Design Block -->
        <section class="mb-32">
            <div class="flex justify-center">
                <div class="text-center md:max-w-xl lg:max-w-3xl">
                    <h2 class="mb-12 px-6 text-3xl font-bold text-gray-800 dark:text-gray-300">Свяжитесь с нами</h2>
                </div>
            </div>

            <div class="flex flex-wrap">
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                    <From />
                </div>
                <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                    <div class="flex flex-wrap">
                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                            <div class="flex items-start">
                                <div class="shrink-0">
                                    <div class="inline-block rounded-md bg-slate-600 dark:bg-gray-800 p-4 text-primary">
                                        <icon name="lucide:phone-call" size="35px" />
                                    </div>
                                </div>
                                <div class="ml-6 grow">
                                    <p class="mb-2 font-bold text-gray-800 dark:text-gray-300">
                                        Телефон
                                    </p>
                                    <ULink to="tel:79372979997" active-class="text-lime-500 dark:text-indigo-500"
                                        inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                                        +7 937 297 99 97
                                    </ULink>
                                </div>
                            </div>
                        </div>
                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                            <div class="flex items-start">
                                <div class="shrink-0">
                                    <div class="inline-block rounded-md bg-slate-600 dark:bg-gray-800 p-4 text-primary">
                                        <icon name="material-symbols:mail-outline" size="35px" />
                                    </div>
                                </div>
                                <div class="ml-6 grow">
                                    <p class="mb-2 font-bold text-gray-800 dark:text-gray-300">
                                        Email
                                    </p>
                                    <ULink to="mailto:pokraska-kzn@yandex.ru"
                                        active-class="text-lime-500 dark:text-indigo-500"
                                        inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                                        pokraska-kzn@yandex.ru</ULink>
                                </div>
                            </div>
                        </div>
                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                            <div class="align-start flex">
                                <div class="shrink-0">
                                    <div class="inline-block rounded-md bg-slate-600 dark:bg-gray-800 p-4 text-primary">
                                        <icon name="logos:whatsapp-icon" size="35px" />
                                    </div>
                                </div>
                                <div class="ml-6 grow">
                                    <p class="mb-2 font-bold text-gray-800 dark:text-gray-300">Whatsapp</p>


                                    <ULink to="https://wa.me/79372979997" active-class="text-lime-500 dark:text-indigo-500"
                                        inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                                        +7 937 297 99 97</ULink>

                                </div>
                            </div>
                        </div>
                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                            <div class="align-start flex">
                                <div class="shrink-0">
                                    <div class="inline-block rounded-md bg-slate-600 dark:bg-gray-800 p-4 text-primary">
                                        <icon name="logos:telegram" size="35px" />
                                    </div>
                                </div>
                                <div class="ml-6 grow">
                                    <p class="mb-2 font-bold text-gray-800 dark:text-gray-300">Telegramm</p>
                                    <ULink to="https://t.me/+79372979997" active-class="text-lime-500 dark:text-indigo-500"
                                        inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                                        +7 937 297 99 97</ULink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Section: Design Block -->
    </div>
</template>
