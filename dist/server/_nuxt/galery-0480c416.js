import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "devalue";
import "defu";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "tailwind-merge";
import "ohash";
const Galery_vue_vue_type_style_index_0_scoped_f6ae4428_lang = "";
const _sfc_main$1 = {
  data() {
    return {
      imageGalleryOpened: false,
      imageGalleryImageIndex: null,
      images: [
        "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg",
        "https://images.unsplash.com/photo-1689217634234-38efb49cb664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        "https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "https://cdn.devdojo.com/images/june2023/mountains-10.jpeg",
        "https://cdn.devdojo.com/images/june2023/mountains-06.jpeg",
        "https://images.pexels.com/photos/1891234/pexels-photo-1891234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
        "https://images.pexels.com/photos/4256852/pexels-photo-4256852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      ]
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
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-f6ae4428><div class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "opacity": "1", "transform": "translate(0px, 0px)" })}" data-v-f6ae4428><ul id="gallery" class="grid grid-cols-2 gap-5 lg:grid-cols-5" data-v-f6ae4428><!--[-->`);
  ssrRenderList($data.images, (image, index) => {
    _push(`<li data-v-f6ae4428><img${ssrRenderAttr("src", image)} class="object-cover select-none w-full h-auto bg-gray-200 rounded cursor-zoom-in aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]"${ssrRenderAttr("alt", "photo gallery image " + (index + 1))} data-v-f6ae4428></li>`);
  });
  _push(`<!--]--></ul></div>`);
  if ($data.imageGalleryOpened) {
    _push(`<div class="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 select-none cursor-zoom-out" data-v-f6ae4428><div class="relative flex items-center justify-center w-11/12 xl:w-4/5 h-11/12" data-v-f6ae4428><div class="absolute left-0 flex items-center justify-center text-white translate-x-10 rounded-full cursor-pointer xl:-translate-x-24 2xl:-translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20" data-v-f6ae4428><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-f6ae4428><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-v-f6ae4428></path></svg></div><img style="${ssrRenderStyle($data.imageGalleryOpened ? null : { display: "none" })}" class="object-contain object-center w-full h-full select-none cursor-zoom-out"${ssrRenderAttr("src", $data.images[$data.imageGalleryImageIndex])} alt="" data-v-f6ae4428><div class="absolute right-0 flex items-center justify-center text-white -translate-x-10 rounded-full cursor-pointer xl:translate-x-24 2xl:translate-x-32 bg-white/10 w-14 h-14 hover:bg-white/20" data-v-f6ae4428><svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-f6ae4428><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-f6ae4428></path></svg></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Galery.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f6ae4428"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Galery = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Galery, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/galery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const galery = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  galery as default
};
//# sourceMappingURL=galery-0480c416.js.map
