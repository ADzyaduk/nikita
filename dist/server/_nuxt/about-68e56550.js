import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center p-8" }, _attrs))}><h2 class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"> Почему Механизированная Покраска - Выбор №1? </h2><div class="flex flex-wrap items-center mt-20 text-left text-center"><div class="w-full md:w-3/5 lg:w-1/2 px-4"><img src="https://picsum.photos/400/240" alt="gem" class="inline-block rounded shadow-lg border border-merino-400"></div><div class="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12"><h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl"> 1. Скорость и Эффективность </h3><p class="sm:text-lg mt-6"> Механизированная покраска предлагает высокую скорость работы, позволяя наносить краску на поверхности в 4-5 раз быстрее, чем при ручной покраске. Это особенно важно для крупных объектов, таких как промышленные помещения, склады и торговые центры. Благодаря этому преимуществу, процессы окрашивания могут быть завершены более эффективно. </p></div></div><div class="flex flex-wrap items-center mt-20 text-left text-center"><div class="w-full md:w-3/5 lg:w-1/2 px-4"><img src="https://picsum.photos/400/240" alt="project members" class="inline-block rounded shadow-lg border border-merino-400"></div><div class="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12"><h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl"> Экономия Времени и Материалов </h3><p class="sm:text-lg mt-6"> Механизированная покраска также обеспечивает экономию времени и материалов. Расход краски уменьшается на 30%, поскольку эта технология минимизирует потери краски, которые часто возникают при ручной покраске. Это приводит не только к более эффективному использованию ресурсов, но и к снижению затрат. </p></div></div><div class="flex flex-wrap items-center mt-20 text-left text-center"><div class="w-full md:w-3/5 lg:w-1/2 px-4"><img src="https://picsum.photos/400/240" alt="editor" class="inline-block rounded shadow-lg border border-merino-400"></div><div class="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12"><h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl"> Качественное Покрытие </h3><p class="sm:text-lg mt-6"> Механизированная покраска гарантирует высокое качество покрытия благодаря равномерному и однородному распределению краски. При использовании высокого давления краска распыляется равномерно, избегая подтеков и наплывов. Это важно для создания эстетически приятных и прочных покрытий на различных поверхностях. </p></div></div><div class="flex flex-wrap items-center mt-20 text-left text-center"><div class="w-full md:w-3/5 lg:w-1/2 px-4"><img src="https://picsum.photos/400/240" alt="bulk editing" class="inline-block rounded shadow-lg border border-merino-400"></div><div class="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12"><h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl"> Универсальность и Безопасность </h3><p class="sm:text-lg mt-6"> Механизированная покраска предоставляет возможность наносить краску даже на труднодоступные места, что включает в себя вертикальные и горизонтальные поверхности, а также труднодоступные области, такие как потолки и воздуховоды. Кроме того, этот метод способствует снижению пыли и вредных веществ в воздухе, что делает рабочую среду более безопасной для здоровья человека. </p></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeaturedSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FeaturedSection = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_FeaturedSection, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  about as default
};
//# sourceMappingURL=about-68e56550.js.map
