<template>
    <div class="mt-5 mb-32">
        <div class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view"
            style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
            <ul ref="gallery" id="gallery" class="grid grid-cols-2 gap-5 lg:grid-cols-5">
                <li v-for="(image, index) in images" :key="index">
                    <img @click="imageGalleryOpen(index)" :src="image"
                        class="object-cover select-none w-full h-auto bg-gray-200 rounded cursor-zoom-in aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]"
                        :alt="'photo gallery image ' + (index + 1)">
                </li>
            </ul>
        </div>
        <div v-if="imageGalleryOpened" @click="imageGalleryClose" @keydown.escape="imageGalleryClose"
            class="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 select-none cursor-zoom-out">
            <div class="relative flex items-center justify-center w-11/12 xl:w-4/5 h-11/12">
                <div @click.stop="imageGalleryPrev"
                    class="absolute left-0 flex items-center justify-center text-white translate-x-10 rounded-full cursor-pointer xl:-translate-x-24 2xl:-translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <img v-show="imageGalleryOpened"
                    class="object-contain object-center w-full h-full select-none cursor-zoom-out"
                    :src="images[imageGalleryImageIndex]" alt="">
                <div @click.stop="imageGalleryNext"
                    class="absolute right-0 flex items-center justify-center text-white -translate-x-10 rounded-full cursor-pointer xl:translate-x-24 2xl:translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            imageGalleryOpened: false,
            imageGalleryImageIndex: null,
            images: [
                '/gallery/1.jpeg',
                '/gallery/2.jpeg',
                '/gallery/3.jpeg',
                '/gallery/4.jpeg',
                '/gallery/5.jpeg',
                '/gallery/6.jpeg',
                '/gallery/7.jpeg',
                '/gallery/8.jpeg',
                '/gallery/9.jpeg',
                '/gallery/10.jpg',
                '/gallery/12.jpg',
                '/gallery/11.jpg',
                '/gallery/13.jpg',
                '/gallery/14.jpg',
                '/gallery/15.jpg',
                '/gallery/16.jpg',
                '/gallery/17.jpg',
                '/gallery/18.jpg',
                '/gallery/19.jpg',
                '/gallery/20.jpg',

            ],
        };
    },
    methods: {
        imageGalleryOpen(index) {
            this.imageGalleryImageIndex = index;
            this.imageGalleryOpened = true;
        },
        imageGalleryClose() {
            this.imageGalleryOpened = false;
        },
        imageGalleryNext() {
            this.imageGalleryImageIndex = (this.imageGalleryImageIndex + 1) % this.images.length;
        },
        imageGalleryPrev() {
            this.imageGalleryImageIndex = (this.imageGalleryImageIndex - 1 + this.images.length) % this.images.length;
        },
    },
};
</script>
  
<style scoped>
/* Добавьте стили по необходимости */
</style>
  