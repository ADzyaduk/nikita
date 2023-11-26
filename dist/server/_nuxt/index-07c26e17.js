import { mergeProps, useSSRContext, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import { _ as __nuxt_component_1$1 } from "./Button-1a02680a.js";
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
const _imports_0 = "" + __buildAssetsURL("img3.5b14295e.jpg");
const _imports_1 = "" + __buildAssetsURL("img4.19b3b3c6.jpg");
const _imports_2 = "" + __buildAssetsURL("img5.41286bbf.jpg");
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" }, _attrs))}><div class="grid gap-10 lg:grid-cols-2"><div class="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg"><div class="max-w-xl mb-6"><h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-300 sm:text-4xl sm:leading-none"> Профессиональная покраска<br class="hidden md:block"><span class="inline-block text-deep-purple-accent-400"></span></h2><p class="text-base text-gray-700 dark:text-gray-300 md:text-lg"> Добро пожаловать на наш сайт, посвященный искусству преображения вашего пространства через профессиональную покраску. Наша компания предоставляет широкий спектр услуг по окраске, помогая создать новое впечатление и стиль вашего дома или офиса. </p></div><div><a href="about" aria-label="" class="inline-flex items-center font-semibold transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500"> Узнать больше <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12"><path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path></svg></a></div></div><div class="flex items-center justify-center -mx-4 lg:pl-8"><div class="flex flex-col items-end px-3"><img class="object-cover mb-6 rounded shadow-xl h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"${ssrRenderAttr("src", _imports_0)} alt=""><img class="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"${ssrRenderAttr("src", _imports_1)} alt=""></div><div class="px-3"><img class="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"${ssrRenderAttr("src", _imports_2)} alt=""></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="container mx-auto grid grid-cols-4 gap-8 p-8 md:p-16"><div class="col-span-4 sm:col-span-2 lg:col-span-1 relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-lime-500 rounded-xl text-gray-300 dark:border-indigo-500"><span class="absolute -top-6 p-3 border-2 border-lime-500 dark:border-indigo-500 rounded-full bg-slate-600 dark:bg-gray-800"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75v2.793a.75.75 0 0 1 1 .707v2a.75.75 0 0 1-1.008.704c-.006.2-.015.386-.03.555c-.04.435-.128.836-.343 1.212c-.143.25-.323.477-.535.672c-.32.295-.692.463-1.103.588c-.388.117-.871.213-1.443.325l-.074.015c-.39.077-.744.147-1.04.17c-.317.025-.675.008-1.017-.185a1.76 1.76 0 0 1-.524-.45c-.237-.304-.316-.65-.35-.97c-.033-.3-.033-.672-.033-1.088v-5.236c0-.354 0-.672.025-.933c.027-.279.09-.58.273-.859c.151-.23.354-.422.593-.56c.295-.17.603-.208.88-.21c.257-.002.565.029.901.062l.07.007c.586.057 1.079.106 1.478.185c.274.054.533.128.776.245a8.25 8.25 0 0 0-16.492 0c.243-.117.502-.19.776-.245c.4-.079.892-.127 1.478-.185l.07-.007c.336-.033.644-.064.9-.062c.278.002.586.04.88.21c.24.138.443.33.594.56c.183.28.245.58.273.859c.025.26.025.579.025.933v5.236c0 .416 0 .787-.032 1.088c-.035.32-.114.666-.351.97a1.76 1.76 0 0 1-.524.45c-.342.193-.7.21-1.018.185a9.796 9.796 0 0 1-1.04-.17l-.073-.015c-.572-.112-1.055-.208-1.443-.325c-.411-.125-.783-.293-1.103-.588a2.816 2.816 0 0 1-.535-.672c-.215-.376-.302-.777-.343-1.212a8.633 8.633 0 0 1-.03-.555a.75.75 0 0 1-1.008-.704v-2a.75.75 0 0 1 1-.707V12Zm1.5 5.193c0 .652 0 1.09.032 1.427c.03.326.084.49.15.606c.069.118.153.224.25.314c.092.085.228.166.522.255c.308.094.717.175 1.333.297c.442.087.71.138.906.154a.678.678 0 0 0 .171-.001a.261.261 0 0 0 .07-.062a.684.684 0 0 0 .042-.207c.023-.211.024-.5.024-.966v-5.165c0-.398 0-.641-.018-.82a.65.65 0 0 0-.034-.182a.268.268 0 0 0-.083-.08a.648.648 0 0 0-.147-.013a8.557 8.557 0 0 0-.777.058c-.631.062-1.05.104-1.37.168c-.305.06-.447.128-.542.2c-.14.105-.26.24-.35.4c-.064.114-.118.278-.147.609c-.031.341-.032.785-.032 1.443v1.565Zm16.5-1.565c0-.658 0-1.102-.032-1.443c-.03-.33-.083-.495-.147-.61a1.324 1.324 0 0 0-.35-.4c-.095-.071-.237-.139-.542-.2c-.32-.063-.739-.105-1.37-.167a8.56 8.56 0 0 0-.777-.058a.648.648 0 0 0-.147.012a.268.268 0 0 0-.083.081a.647.647 0 0 0-.034.181c-.017.18-.018.423-.018.82v5.166c0 .466.001.755.024.965a.684.684 0 0 0 .042.208a.27.27 0 0 0 .07.062c.016.003.064.01.17 0c.198-.015.465-.066.907-.153c.616-.122 1.025-.203 1.333-.297c.294-.089.43-.17.522-.255c.097-.09.181-.196.25-.314c.066-.117.12-.28.15-.606c.031-.338.032-.775.032-1.427v-1.565Z" clipRule="evenodd"></path></svg></span><h2 class="my-1 gradient-red text-base uppercase tracking-wide text-gray-700 dark:text-gray-300"> Профессионализм и опыт:</h2><p class="py-2 text-center text-sm text-gray-500 dark:text-gray-300">Наши мастера обладают обширным опытом и профессиональными навыками в области покраски, гарантируя высокое качество и точное исполнение работ. </p></div><div class="col-span-4 sm:col-span-2 lg:col-span-1 relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-lime-500 rounded-xl text-gray-300 dark:border-indigo-500"><span class="absolute -top-6 p-3 border-2 border-lime-500 dark:border-indigo-500 rounded-full bg-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="m412.284 294.37l-12.5 15.642c-8.354 10.454-50.027 64.208-50.027 95.883c0 36.451 28.049 66.105 62.526 66.105s62.527-29.654 62.527-66.105c0-31.675-41.673-85.429-50.028-95.883Zm0 145.63c-16.832 0-30.526-15.3-30.526-34.105c0-11.662 15.485-37.883 30.531-59.2c15.043 21.3 30.522 47.509 30.522 59.2c0 18.805-13.695 34.105-30.527 34.105ZM122.669 51.492L96.133 124.4L30.092 97.205L17.908 126.8l67.271 27.7L26.9 314.606a48.056 48.056 0 0 0 28.689 61.523l184.719 67.232a48 48 0 0 0 61.523-28.688L397.6 151.56Zm149.1 352.236a16 16 0 0 1-20.508 9.563L66.537 346.059a16 16 0 0 1-9.563-20.507L73.553 280H316.8ZM85.2 248l29.594-81.311l36.333 14.961a32.644 32.644 0 1 0 11.236-29.98l-36.615-15.077l16.046-44.085l214.79 78.177L328 249.219V248Z"></path></svg></span><h2 class="my-1 gradient-red text-base uppercase tracking-wide text-gray-700 dark:text-gray-300"> Лучшие материалы:</h2><p class="py-2 text-center text-sm text-gray-500 dark:text-gray-300">Мы работаем исключительно с качественными красками и материалами, что обеспечивает долговечность покрытия и сохранение его первозданного вида на протяжении долгого времени.</p></div><div class="col-span-4 sm:col-span-2 lg:col-span-1 relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-lime-500 rounded-xl text-gray-300 dark:border-indigo-500"><span class="absolute -top-6 p-3 border-2 border-lime-500 dark:border-indigo-500 rounded-full bg-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10.95 16.55l5.65-5.65l-1.425-1.425L10.95 13.7l-2.125-2.125L7.4 13l3.55 3.55ZM12 22q-1.875 0-3.512-.713t-2.85-1.924q-1.213-1.213-1.925-2.85T3 13q0-1.875.713-3.513t1.924-2.85q1.213-1.212 2.85-1.924T12 4q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 22Zm0-9ZM5.6 2.35L7 3.75L2.75 8l-1.4-1.4L5.6 2.35Zm12.8 0l4.25 4.25l-1.4 1.4L17 3.75l1.4-1.4ZM12 20q2.925 0 4.963-2.038T19 13q0-2.925-2.038-4.963T12 6Q9.075 6 7.037 8.038T5 13q0 2.925 2.038 4.963T12 20Z"></path></svg></span><h2 class="my-1 gradient-red text-base uppercase tracking-wide text-gray-700 dark:text-gray-300"> Индивидуальный подход:</h2><p class="py-2 text-center text-sm text-gray-500 dark:text-gray-300">Мы предоставляем консультации по выбору цветовых решений, принимая во внимание ваш стиль, предпочтения и особенности помещения для создания уникального и гармоничного дизайна.</p></div><div class="col-span-4 sm:col-span-2 lg:col-span-1 relative px-5 pt-10 pb-2 flex flex-col justify-start items-center border-2 border-lime-500 rounded-xl text-gray-300 dark:border-indigo-500"><span class="absolute -top-6 p-3 border-2 border-lime-500 dark:border-indigo-500 rounded-full bg-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M445.1 22.93c-3.8.11-7.9 1.81-11.5 5.98C379.2 107.6 318.8 184.7 257.3 261.4c2.3.9 4.5 1.9 6.5 3.1c4.5 2.5 8.4 5.6 11.7 9C339 197.6 401.3 121.1 455.6 40.87c4.3-9.84 1.1-13.83-3.8-16.4c-1.2-.65-2.6-1.13-4.1-1.37c-.8-.13-1.7-.19-2.6-.17zM63.14 46.41c7.69 13.5 16.6 26.49 2.25 47.15c10.45-10.72 22.95-21.51 42.41-1.4c-4.2-10.17-17.26-17.99-6.1-33.71c-17.06 8.58-25.86 0-38.56-12.04zM267.2 94.02c-7.4 11.08-18.3 14.68-32.6 10.28c14.3 4.9 21.5 14.5 17.7 31.7c8.3-15.5 18.1-21.4 29.5-17.1c-6.4-6.3-17.3-7-14.6-24.88zm181.5 46.78c-4 22.5-6 45.9-43.2 50.9c22.9.8 48.1 3.7 51.7 46.2c5-15-3-37.8 25.6-41.3c-28.6-10.4-30.7-29.2-34.1-55.8zm-358.92 96c2.1 24.8-8.1 41.4-37.08 45.6c29.38 3.7 44.88 15.4 45.88 35.5c5.62-13.5-.7-30.8 28.72-36.8c-22.1-5.2-34.82-19.7-37.52-44.3zm155.42 39.7l-13.4 16.6c1.5.8 3 1.7 4.5 2.6c4.4 2.8 8.7 6.1 12.3 9.8l15.2-18c-2.3-2.7-5.4-5.4-8.9-7.4c-3-1.7-6.3-3-9.7-3.6zM208 304.1c-.8 0-1.5 0-2 .1c-1 .2-1.5.5-1.7.7l-.5.6l-.6.4c-46.9 36-117.06 70.7-173.97 104.3c14.77 4.4 29.83 9.7 44.58 15.6l36.39-30.5L88.37 432c17.03 7.6 33.43 16.2 48.03 25.6l27.3-43.8l-12.2 54.2c9 6.7 17 13.8 23.8 21.1c27.2-59.1 63-100.2 67.7-154.8l.1-.6l.1-.6c.6-2.3-.2-5.7-3.1-10c-3-4.2-7.9-8.7-13.4-12.2c-5.4-3.4-11.5-5.8-15.9-6.5c-1.1-.2-2-.3-2.8-.3zm111.2.2c9.7 13.1 9.9 25.8-4.7 38.3c17.6-8.2 30.3-7.2 37.8 3.6c-1.7-9.4-11.1-16.8 3-30.4c-14 4.8-26.1 1.2-36.1-11.5zm56.7 90.8c11.7 17.4 20 29.5 4.1 47.8c23.4-10 29.5 7 41.2 13.8c-19.9-26.8-2.6-39.3 14.1-49.5c-30.5 12.8-44.4-.3-59.4-12.1z"></path></svg></span><h2 class="my-1 gradient-red text-base uppercase tracking-wide text-gray-700 dark:text-gray-300">Комплексный сервис: </h2><p class="py-2 text-center text-sm text-gray-500 dark:text-gray-300">Мы не только обеспечиваем качественную покраску и подготовку поверхности, но и осуществляем полную уборку после завершения процесса работы. Ваше пространство будет оставлено в том состоянии, в котором оно было до начала покраски, с исключительно свежим и красиво окрашенным внешним видом.</p></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Featured.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_UButton = __nuxt_component_1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "pt-5",
    id: "pricing"
  }, _attrs))}><div class="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8"><div class="mx-auto max-w-4xl text-center"><p class="mt-2 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-300 sm:text-3xl">Цены и Тарифы </p></div><p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500 dark:text-gray-300">Choose the product that works best </p><div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"><div class="ring-1 ring-lime-500 dark:ring-indigo-500 rounded-3xl p-8 xl:p-10"><div class="flex items-center justify-between gap-x-4"><h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300"> Комерческие помещения </h2></div><p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1 </p><p class="mt-6 flex items-baseline gap-x-1"><span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽ м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span></p>`);
  _push(ssrRenderComponent(_component_UButton, {
    color: "lime",
    block: "",
    class: "mt-6"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button`);
      } else {
        return [
          createTextVNode("Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10"><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>40 units</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>1 feature</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>Fast delivery</li></ul></div><div class="ring-1 ring-lime-500 dark:ring-indigo-500 rounded-3xl p-8 xl:p-10"><div class="flex items-center justify-between gap-x-4"><h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300">Частные помещения </h2></div><p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1 </p><p class="mt-6 flex items-baseline gap-x-1"><span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽ м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span></p>`);
  _push(ssrRenderComponent(_component_UButton, {
    block: "",
    color: "lime",
    class: "mt-6"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button`);
      } else {
        return [
          createTextVNode("Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10"><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>40 units</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>1 feature</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>Fast delivery</li></ul></div><div class="ring-1 ring-lime-500 dark:ring-indigo-500 rounded-3xl p-8 xl:p-10"><div class="flex items-center justify-between gap-x-4"><h2 id="product1" class="text-lg font-semibold leading-8 text-gray-700 dark:text-gray-300"> Промышленные помещения </h2></div><p class="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">Product details for Product Type 1 </p><p class="mt-6 flex items-baseline gap-x-1"><span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">От 150₽ м²</span><span class="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300"></span></p>`);
  _push(ssrRenderComponent(_component_UButton, {
    color: "lime",
    block: "",
    class: "mt-6"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button`);
      } else {
        return [
          createTextVNode("Button")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-300 xl:mt-10"><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>40 units</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>1 feature</li><li class="flex gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-5 flex-none dark:text-white"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>Fast delivery</li></ul></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Price.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Hero = __nuxt_component_0;
  const _component_Featured = __nuxt_component_1;
  const _component_Price = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Hero, null, null, _parent));
  _push(ssrRenderComponent(_component_Featured, null, null, _parent));
  _push(ssrRenderComponent(_component_Price, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-07c26e17.js.map
