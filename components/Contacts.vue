<script>
import axios from 'axios';
import Zod from 'zod';


const toast = useToast();

const formSchema = Zod.object({
    name: Zod.string().min(2).max(50),
    phone: Zod.string().min(10).max(15),
    text: Zod.string().min(5).max(500),
});

export default {
    data() {
        return {
            formData: {
                name: '',
                phone: '',
                text: '',
            },
            formErrors: {
                name: '',
                phone: '',
                text: '',
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                const validatedData = formSchema.parse(this.formData);
                const response = await axios.post(
                    `https://api.telegram.org/bot${'6849693417:AAEhtkyzlwPWpfcHucqmLS_jbiskfQNI7c0'}/sendMessage`,
                    {
                        chat_id: '-1002054840999',
                        text: `Имя: ${validatedData.name}\nТелефон: ${validatedData.phone}\nСообщение: ${validatedData.text}`,
                    }
                );

                if (response.status === 200) {
                    this.formData.name = '';
                    this.formData.phone = '';
                    this.formData.text = '';
                    toast({ title: 'Сообщение отправлено!', variant: 'success' });
                } else {
                    console.error("Error sending message:", response);
                }
            } catch (error) {
                if (error instanceof Zod.ZodError) {
                    this.formErrors = error.errors.reduce((errors, { path, message }) => {
                        errors[path[0]] = message;
                        return errors;
                    }, {});
                } else {
                    console.error("Error submitting form:", error);
                }
            }
        },
    },
};
</script>



<style lang="scss" scoped></style>

<template>
    <!-- Container for demo purpose -->
    <div class="container my-24 mx-auto md:px-6">
        <!-- Section: Design Block -->
        <section class="mb-32">
            <div class="flex justify-center">
                <div class="text-center md:max-w-xl lg:max-w-3xl">
                    <h2 class="mb-12 px-6 text-3xl font-bold">Свяжитесь с нами</h2>
                </div>
            </div>

            <div class="flex flex-wrap">
                <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                    <form>
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <UInput v-model="formData.name" color="lime" placeholder="Имя"></UInput>
                            <span class="text-red-500">{{ formErrors.name }}</span>
                        </div>
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <UInput v-model="formData.phone" type="tel" color="lime" placeholder="Телефон"></UInput>
                            <span class="text-red-500">{{ formErrors.phone }}</span>
                        </div>
                        <div class="relative mb-6" data-te-input-wrapper-init>
                            <UTextarea v-model="formData.text" color="lime" placeholder="Сообщение"></UTextarea>
                            <span class="text-red-500">{{ formErrors.text }}</span>
                        </div>

                        <UButton @click="submitForm" block label="Отправить" color="lime"></UButton>
                    </form>
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
                                    <p class="mb-2 font-bold dark:text-white">
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
                                    <p class="mb-2 font-bold dark:text-white">
                                        Email
                                    </p>
                                    <ULink to="mailto:info@lorem.mail" active-class="text-lime-500 dark:text-indigo-500"
                                        inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                                        Nekit6681@yandex.ru</ULink>
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
                                    <p class="mb-2 font-bold dark:text-white">Whatsapp</p>


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
                                    <p class="mb-2 font-bold dark:text-white">Telegramm</p>
                                    <p class="text-neutral-500 dark:text-neutral-200">
                                        +1 234-567-89
                                    </p>
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

