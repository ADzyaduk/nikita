import { effectScope, reactive, hasInjectionContext, getCurrentInstance, version, unref, inject, ref, watchEffect, watch, toRef, isRef, defineComponent, computed, h, resolveComponent, nextTick, shallowRef, shallowReactive, isReadonly, isShallow, isReactive, toRaw, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, useSSRContext, createElementBlock, createTextVNode, Suspense, Transition, provide, defineAsyncComponent, onErrorCaptured, onServerPrefetch, createApp } from "vue";
import { $fetch } from "ofetch";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import "destr";
import "devalue";
import { createDefu as createDefu$1, defu } from "defu";
import { klona } from "klona";
import { getActiveHead } from "unhead";
import { defineHeadPlugin, composableNames } from "@unhead/shared";
import { createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1, RouterView } from "vue-router";
import { sanitizeStatusCode, createError as createError$1 } from "h3";
import { withQuery, hasProtocol, parseURL, isScriptProtocol, joinURL, parseQuery, withTrailingSlash, withoutTrailingSlash } from "ufo";
import { extendTailwindMerge } from "tailwind-merge";
import { ssrRenderVNode, ssrRenderSlot, ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderSuspense } from "vue/server-renderer";
import { isEqual } from "ohash";
const appConfig$1 = useRuntimeConfig$1().app;
const baseURL = () => appConfig$1.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.8.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    const promise = applyPlugin(nuxtApp, plugin2);
    if (plugin2.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxt = /* @__PURE__ */ useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$3 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!_isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (_isPlainObject(value) && _isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function _isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {
  "nuxt": {
    "buildId": "49eff3c5-8772-4327-9356-13359021c98e"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
};
const appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(appConfig);
  }
  return nuxtApp._appConfig;
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const _routes = [
  {
    name: "about",
    path: "/about",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/about-68e56550.js").then((m) => m.default || m)
  },
  {
    name: "contacts",
    path: "/contacts",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/contacts-4720545e.js").then((m) => m.default || m)
  },
  {
    name: "galery",
    path: "/galery",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/galery-0480c416.js").then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/index-07c26e17.js").then((m) => m.default || m)
  },
  {
    name: "price",
    path: "/price",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/price-18163d2e.js").then((m) => m.default || m)
  },
  {
    name: "rewievs",
    path: "/rewievs",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/rewievs-bfd70e3a.js").then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(from, to) {
  return to.path !== from.path || JSON.stringify(from.params) !== JSON.stringify(to.params);
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a2;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_sIDK6K9VnH = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const customTwMerge = extendTailwindMerge({
  classGroups: {
    icons: [(classPart) => /^i-/.test(classPart)]
  }
});
const defuTwMerge = createDefu$1((obj, key, value, namespace) => {
  if (namespace !== "default" && typeof obj[key] === "string" && typeof value === "string" && obj[key] && value) {
    obj[key] = customTwMerge(obj[key], value);
    return true;
  }
});
function mergeConfig(strategy, ...configs) {
  if (strategy === "override") {
    return defu({}, ...configs);
  }
  return defuTwMerge({}, ...configs);
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(_, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
}
const _inherit = "inherit";
const _current = "currentColor";
const _transparent = "transparent";
const _black = "#000";
const _white = "#fff";
const _slate = { "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1", "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155", "800": "#1e293b", "900": "#0f172a", "950": "#020617" };
const _gray = { "50": "rgb(var(--color-gray-50) / <alpha-value>)", "100": "rgb(var(--color-gray-100) / <alpha-value>)", "200": "rgb(var(--color-gray-200) / <alpha-value>)", "300": "rgb(var(--color-gray-300) / <alpha-value>)", "400": "rgb(var(--color-gray-400) / <alpha-value>)", "500": "rgb(var(--color-gray-500) / <alpha-value>)", "600": "rgb(var(--color-gray-600) / <alpha-value>)", "700": "rgb(var(--color-gray-700) / <alpha-value>)", "800": "rgb(var(--color-gray-800) / <alpha-value>)", "900": "rgb(var(--color-gray-900) / <alpha-value>)", "950": "rgb(var(--color-gray-950) / <alpha-value>)" };
const _zinc = { "50": "#fafafa", "100": "#f4f4f5", "200": "#e4e4e7", "300": "#d4d4d8", "400": "#a1a1aa", "500": "#71717a", "600": "#52525b", "700": "#3f3f46", "800": "#27272a", "900": "#18181b", "950": "#09090b" };
const _neutral = { "50": "#fafafa", "100": "#f5f5f5", "200": "#e5e5e5", "300": "#d4d4d4", "400": "#a3a3a3", "500": "#737373", "600": "#525252", "700": "#404040", "800": "#262626", "900": "#171717", "950": "#0a0a0a" };
const _stone = { "50": "#fafaf9", "100": "#f5f5f4", "200": "#e7e5e4", "300": "#d6d3d1", "400": "#a8a29e", "500": "#78716c", "600": "#57534e", "700": "#44403c", "800": "#292524", "900": "#1c1917", "950": "#0c0a09" };
const _red = { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d", "950": "#450a0a" };
const _orange = { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12", "950": "#431407" };
const _amber = { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f", "950": "#451a03" };
const _yellow = { "50": "#fefce8", "100": "#fef9c3", "200": "#fef08a", "300": "#fde047", "400": "#facc15", "500": "#eab308", "600": "#ca8a04", "700": "#a16207", "800": "#854d0e", "900": "#713f12", "950": "#422006" };
const _lime = { "50": "#f7fee7", "100": "#ecfccb", "200": "#d9f99d", "300": "#bef264", "400": "#a3e635", "500": "#84cc16", "600": "#65a30d", "700": "#4d7c0f", "800": "#3f6212", "900": "#365314", "950": "#1a2e05" };
const _green = { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d", "950": "#052e16" };
const _emerald = { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b", "950": "#022c22" };
const _teal = { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a", "950": "#042f2e" };
const _cyan = { "50": "#ecfeff", "100": "#cffafe", "200": "#a5f3fc", "300": "#67e8f9", "400": "#22d3ee", "500": "#06b6d4", "600": "#0891b2", "700": "#0e7490", "800": "#155e75", "900": "#164e63", "950": "#083344" };
const _sky = { "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc", "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1", "800": "#075985", "900": "#0c4a6e", "950": "#082f49" };
const _blue = { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" };
const _indigo = { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b" };
const _violet = { "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95", "950": "#2e1065" };
const _purple = { "50": "#faf5ff", "100": "#f3e8ff", "200": "#e9d5ff", "300": "#d8b4fe", "400": "#c084fc", "500": "#a855f7", "600": "#9333ea", "700": "#7e22ce", "800": "#6b21a8", "900": "#581c87", "950": "#3b0764" };
const _fuchsia = { "50": "#fdf4ff", "100": "#fae8ff", "200": "#f5d0fe", "300": "#f0abfc", "400": "#e879f9", "500": "#d946ef", "600": "#c026d3", "700": "#a21caf", "800": "#86198f", "900": "#701a75", "950": "#4a044e" };
const _pink = { "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843", "950": "#500724" };
const _rose = { "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337", "950": "#4c0519" };
const _primary = { "50": "rgb(var(--color-primary-50) / <alpha-value>)", "100": "rgb(var(--color-primary-100) / <alpha-value>)", "200": "rgb(var(--color-primary-200) / <alpha-value>)", "300": "rgb(var(--color-primary-300) / <alpha-value>)", "400": "rgb(var(--color-primary-400) / <alpha-value>)", "500": "rgb(var(--color-primary-500) / <alpha-value>)", "600": "rgb(var(--color-primary-600) / <alpha-value>)", "700": "rgb(var(--color-primary-700) / <alpha-value>)", "800": "rgb(var(--color-primary-800) / <alpha-value>)", "900": "rgb(var(--color-primary-900) / <alpha-value>)", "950": "rgb(var(--color-primary-950) / <alpha-value>)", "DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)" };
const _cool = { "50": "#f9fafb", "100": "#f3f4f6", "200": "#e5e7eb", "300": "#d1d5db", "400": "#9ca3af", "500": "#6b7280", "600": "#4b5563", "700": "#374151", "800": "#1f2937", "900": "#111827", "950": "#030712" };
const config = { "inherit": _inherit, "current": _current, "transparent": _transparent, "black": _black, "white": _white, "slate": _slate, "gray": _gray, "zinc": _zinc, "neutral": _neutral, "stone": _stone, "red": _red, "orange": _orange, "amber": _amber, "yellow": _yellow, "lime": _lime, "green": _green, "emerald": _emerald, "teal": _teal, "cyan": _cyan, "sky": _sky, "blue": _blue, "indigo": _indigo, "violet": _violet, "purple": _purple, "fuchsia": _fuchsia, "pink": _pink, "rose": _rose, "primary": _primary, "cool": _cool };
const colors_244lXBzhnM = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig2 = useAppConfig();
  const root = computed(() => {
    const primary = config[appConfig2.ui.primary];
    const gray = config[appConfig2.ui.gray];
    if (!primary) {
      console.warn(`[@nuxt/ui] Primary color '${appConfig2.ui.primary}' not found in Tailwind config`);
    }
    if (!gray) {
      console.warn(`[@nuxt/ui] Gray color '${appConfig2.ui.gray}' not found in Tailwind config`);
    }
    return `:root {
${Object.entries(primary || config.green).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`).join("\n")}
--color-primary-DEFAULT: var(--color-primary-500);

${Object.entries(gray || config.cool).map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value)};`).join("\n")}
}

.dark {
  --color-primary-DEFAULT: var(--color-primary-400);
}
`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "system";
const plugin_server_XNCxeHyTuP = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_sIDK6K9VnH,
  colors_244lXBzhnM,
  plugin_server_XNCxeHyTuP
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  props: {
    ...__nuxt_component_0$3.props,
    as: {
      type: String,
      default: "button"
    },
    disabled: {
      type: Boolean,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactQuery: {
      type: Boolean,
      default: false
    },
    exactHash: {
      type: Boolean,
      default: false
    },
    inactiveClass: {
      type: String,
      default: void 0
    }
  },
  setup(props) {
    function resolveLinkClass(route, $route, { isActive, isExactActive }) {
      if (props.active) {
        return props.activeClass;
      }
      if (props.exactQuery && !isEqual(route.query, $route.query)) {
        return props.inactiveClass;
      }
      if (props.exactHash && route.hash !== $route.hash) {
        return props.inactiveClass;
      }
      if (props.exact && isExactActive) {
        return props.activeClass;
      }
      if (!props.exact && isActive) {
        return props.activeClass;
      }
      return props.inactiveClass;
    }
    return {
      resolveLinkClass
    };
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$3;
  if (!_ctx.to) {
    ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({ disabled: _ctx.disabled }, _ctx.$attrs, { class: _ctx.inactiveClass }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "default")
          ];
        }
      }),
      _: 3
    }), _parent);
  } else {
    _push(ssrRenderComponent(_component_NuxtLink, mergeProps(_ctx.$props, { custom: "" }, _attrs), {
      default: withCtx(({ route, href, target, rel, navigate, isActive, isExactActive, isExternal }, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<a${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
            href: !_ctx.disabled ? href : void 0,
            "aria-disabled": _ctx.disabled ? "true" : void 0,
            role: _ctx.disabled ? "link" : void 0,
            rel,
            target,
            class: _ctx.resolveLinkClass(route, _ctx.$route, { isActive, isExactActive })
          }))}${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "default", { isActive: _ctx.exact ? isExactActive : isActive }, null, _push2, _parent2, _scopeId);
          _push2(`</a>`);
        } else {
          return [
            createVNode("a", mergeProps(_ctx.$attrs, {
              href: !_ctx.disabled ? href : void 0,
              "aria-disabled": _ctx.disabled ? "true" : void 0,
              role: _ctx.disabled ? "link" : void 0,
              rel,
              target,
              class: _ctx.resolveLinkClass(route, _ctx.$route, { isActive, isExactActive }),
              onClick: (e) => !isExternal && navigate(e)
            }), [
              renderSlot(_ctx.$slots, "default", { isActive: _ctx.exact ? isExactActive : isActive })
            ], 16, ["href", "aria-disabled", "role", "rel", "target", "onClick"])
          ];
        }
      }),
      _: 3
    }, _parent));
  }
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Link.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4]]);
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const __nuxt_component_0$1 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$6 = {
  __name: "ColorMode",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    computed({
      get() {
        return colorMode.value === "dark";
      },
      set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "w-8 h-8" })
            ];
          }
        })
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Btn/ColorMode.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = _sfc_main$6;
const _imports_0$1 = "" + __publicAssetsURL("logo.png");
const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_ULink = __nuxt_component_0$2;
  const _component_BtnColorMode = __nuxt_component_1$1;
  _push(`<!--[--><div><nav class="relative container mx-auto p-6"><div class="flex items-center justify-between"><div class="pt-2"><img${ssrRenderAttr("src", _imports_0$1)} alt="logo" class="" width="300px"></div><div class="hidden md:flex space-x-6">`);
  _push(ssrRenderComponent(_component_ULink, {
    to: "/",
    "active-class": "text-primary dark:text-indigo-500",
    "inactive-class": "font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Главная `);
      } else {
        return [
          createTextVNode(" Главная ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ULink, {
    to: "price",
    "active-class": "text-primary dark:text-indigo-500",
    "inactive-class": "font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Цены `);
      } else {
        return [
          createTextVNode(" Цены ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ULink, {
    to: "galery",
    "active-class": "text-primary dark:text-indigo-500",
    "inactive-class": "font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Галерея `);
      } else {
        return [
          createTextVNode(" Галерея ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ULink, {
    to: "contacts",
    "active-class": "text-primary dark:text-indigo-500",
    "inactive-class": "font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Контакты `);
      } else {
        return [
          createTextVNode(" Контакты ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div>`);
  _push(ssrRenderComponent(_component_BtnColorMode, { class: "m-2" }, null, _parent));
  _push(`</div></div></nav></div><hr class="my-4 border-t border-lime-500 dark:border-indigo-500"><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
const layouts = {};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            // @ts-expect-error seems to be an issue in vue types
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = /* @__PURE__ */ defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        // @ts-expect-error seems to be an issue in vue types
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, {
                // @ts-expect-error seems to be an issue in vue types
                default: () => h(RouteProvider, {
                  key,
                  vnode: routeProps.Component,
                  route: routeProps.route,
                  renderKey: key,
                  trackRootNodes: hasTransition,
                  vnodeRef: pageRef
                })
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAStSURBVHgBxZlPbFNHEMZnNw52k/4JFTRUVVOTSBU9QAIHYhBSjUSbHMkVtSSVcuDUJOXQXqq67aW9tKanIlXCoWoPvYQeqsakUl0JNcABAlwiIYKJhJRAEBEiwQn4LfPts4ljP3v32Sb8JCvOe7v292Z2ZnbHgqqkd3IgqoTTKYWIKqIupahFCGrBPX6/SJLSUlFaOeoKkUyN70ukqAqEn8HRywMtoSfOkMqK4bwYH6T521KUFV+z2LTtJCuBEBZcVV/x4GGqB4IStkKNAnsuHh0iR8SqsJiJNC+G2Hj36dFKgyoK7LnQ/2PdrFYGXr/xZPfoSLn7ngL1Wnusxnh2lDYAJWhqpVEcTO1OLBbfk14Tgo/VvxslDghFXdogHpQI1G7lCbTRsEHw3cWX17m4d/LjAZLyFL1AlHJGkpFf4/n/nwnkxBsmya4lCpMPdr6yg/Zv3kM7X91B2zZtoeZAEy09Waa51QWaWZqliXvn6NqDaevPQ5JfCYrt+fUYWLvlxFhv2PJzqJXFfNY+SLtYWDEQ2RFoo46mNvpg6wG6ygJ/mPmF5lm0CaQz5Fx+qyNbWzBnvZtkyaEtB+hY2xEtxJal7DL9fOt3+mfhnNX4zCaxGVbMBQmsZ8c+dudxtpwfcaC5oUnPw8PZEMo4Ov+6AqV432YS3Hp8+yDVwrF3jujPMaGEGMJfiV0JWQbGR28dLrHc5P1L+mULLIm1awJrEdrYgk6ULMBTH9q63j0TvJ6+uf6TfiFybUFgeQVXMUpku6SSopMsOLztw5JrhQt+bP4s+SHSssc4RpCABe3c297cVnKtWa65248FQaeFBdnPnZJLTJgs8FrYedFYV1iffmgNWgQK79JlLfu8PnY7hCPHTVjmtzx4KBPQJqkG8CVfvvupfn9ylpPw3TWRcHml6MZD2dDQMdiF80XINBBR9/ZLb5Zcf73xNW3FycVL+nVnZYHaucT9MfeXK5otC3cWz51+eMNYVVCXAywORdnoZtRTVBEvUG9f5vx4kksZXF3o7nkWPDZ3tmTujeVZMiL0yZCmyALTGoOA79/7wrOU9bWWpqg/LdKSUOpWgLLOf9QgjSGINQOXVKqlcCXqLSJ6hi30kOfs4u1YccTiYWFZI4qm2MUNU/roYsEbFqkhL7RcGoGw326fITtkSuLErzsBBhCxsEYtILK/5bJoZT0+lkKbTjPs6xOm0bWKg6jPp7+zCw4tirsQlNtRZ0IyHnJ3sWXZXxyFvJ2/s+qmlEpVAVY7wwGBWu2rHHLnwdWZo+f80bjI7cG8QIRi4eOc8T/nu8IvQwQjT0JsnnJjreDWyPje0U/ctzl0/2VF3XwOLQ6/pLnVcjDft3lW6txTlGvWF4uMFTaV1tXiZCQRVxYB87wQSpwY7z61rpnk2Zvpvdi/oa0PgP5Mcu/o7uLrnruZTKPosy2BdUFRCs0jr1uV22+GyK4HcOvfkUTZFl/F/WAycnqYIwrhnqY6g+qllBipJA5YtYB15wGHeyn6qQ7Aao+CFPPqB5aMJR8UCMVBP+xnLiwGYZkQxW2EVSWwEPfA7/BPEXxsFSyWD1+FP0PwBy+6gSZS3G+8Uu3PEE8Bx+bfQydCtHQAAAAASUVORK5CYII=";
const _imports_1 = "data:image/png;base64,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";
const _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOVSURBVHgBzZk/bNNAFMY/hz+FLV2Q6IDSDoDokCAWhkpNpQ4dkNoOlZgoXRBb2wGFrekEZWmysrQVI0NhRKrUVCoSDEjpghADREJirZnaqKjmfT5b/tPEPps0yU86x2c/25/fu3u+uxhIS8kqyjYvhb8FKVmnEFNKwy6nOEAGNawZNaTASGS9ZGVxGYty1ZJPjC4NKTUpqyK2oXuRnkAKG8AK99AZNqEpNF5gyVqUbRnJPRZHA5bc95WxFWUULbBkraNzXmtHRTy53O5ka4EqpNtQHaAb1NHEBCqGGT6RaWk+gF10TxwpOA45w1mBKqwFdJ+i8+wAwRA/sx6L5A30EgvL0nEqbtUTWLJysmVoc+gtprTHYbc9eiG27FSSQ+9xc66N8qDy3k/0E00M0ovKg8p7/cUllX8v2hUD41G21ktvv/YDmHgdPJ8bFPeXvPrCW/mWfQnabM4B8/e8+mBZGtsx2pOB/QXLOKOSXIRp4EYUk4bxEW+fLxkpTpGltowMh4pxluaR76orSMzKZPDFwt5ti4VCRlyZj7Or//b2s1eTebEonitPevXGIbClK9CAeNCKTy17of49cwdasM1tP/LqDGu4/caQz4jKXJyV34NkejTaflpeYPeJ6hhuk3DF0YMJyDLNxI7zwo2aYSuOtLefGQ2epyiKC7+orkAtqvvB+vqDZB0mfx2poEBTx7CyH/RiYQjYmNMTyU7FcK9MIinmBYyVn0IjzMd/5etzAkzd8o7dvgY8dHKAP6RM1NWP6jvKF3GhDbPAh+/Q5RsFFvksHetPv9RD/WL4wHB7fP8VeOcU7k/dVHbk/g3gz5G6lwafmWb2kIDyjkzHdvTt2TFm3wSbB0Ot1X5PUWeaqSMhFJkkZVCkv5PRm0tjGhfKhN8dbvFRqaaVDC8Td35ItTd6ptVggccPy16dLze8Fnnrhsz2htVo5hRVUbuCFDBHssTBEBvPkYQaNyoPnqCC/mOVGyVQjf+r6B823WUR70vStEfVWkn7nGnA8R7xBNKLlneiZ2TEUb5FpeC3WM1HexnqKl4EF5Nar82UrG4vfZC6eO5u+GDr0UwTsxLuxAn8P6jZi0ctiFt+Y8gXcb5UxXNtl/iix4O80MACVM/qNKa9DhMhjugtAXPlgZN7A/PoDFU7rbVYDwyTbBHdE8qJfg7JMB1hFR1hSCXQDyf8nFNz2sqZoZp8+f+GYGFHq0k5SPs3xD+zxwusd9Zt8QAAAABJRU5ErkJggg==";
const _imports_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAtoSURBVHgBpVhtjFxlFT7nvXNndrZsd2ZtUVpDhwRDYYktKuIPpFNLoMYYqIr6QygkGA2KLD/0h8R0qzFCou42MSl/YPkwBuNHKRisEu1uQgoIQisQMCBsiXwUkN1tt7vzdd/X55zz3tml9ssym3fvO3fu3Pd5n/Oc55w7TKf4mvrSt+uFol8T0qweSmEtp1mFU98fihlzMUxRmu2nYjZJxbCPin6878bfjtMpvPj/uXiqPlShHrqJUj+kgIo+YHHCACg5ZjInALR5msW5nMsmA4C2ibdWr7t/8mTXPCmACqxd2AIQN3UBpZmCw6LsUgAteQYonAtswLwBk+tKARsQ8EGAhlDyd7eSbGt1067JE63tTghu7fdvotnSy9jLEG7PFGQQyVwGk77VfyTvQwis+8b/YB/p9cBPwBzk+xldWyLePf+HjZvfF8CpwVtGgg+jmFZ1KR+wZLBl8Z/jMYIIJCAALwggG3FDBlJHRnoNrq3hVmNzuy4fOR6Go4b4ldpwZcmSsCMJWZ2TqCMNlbfwlYKFTsIpoUxz7VlYu+8R+niOu5+nqtVAqUhBr5Fze5tpe311/fj0STGYlmk3yKqHfA/GUoyli2wYUySs0iKGvLDKyiYrc/iehTcEYU/m2RGjw2tLnXTH0bD8D8D9gz8cwXprbbmoHwmVtxAi5LaYLixXOWhKwh7Dq9eIFu0ooIJcl+E67/S7Os+wCQMYdHS4PvfwZSPHBfjS4I82IyhDqvlghOQLxyTI30dw+QZU+CRgVJeygcjaAmMCDKOTADTu35HvYPmOwxyA5dimIWhy6KgAn1/9kxrYGNZIBV2TdW2EUNmIoNgEriMHwl5DGlgYksW9i4BzpoQ5p6CCgsR3MgHEMpjaMnfEbfk+bZnaUa/kuAr5JCQ0DPZqbDJhB1gKkmX3iGuCuQAsl6n01YupePmF5D44kCfZMf00NA6zP/Aqdf71BGcv/43C3FuLvMjJjk3fInQRig+VEpe34Ks3d2/8NNgrOn6lAIpkJPGIAdyeE4d7FHB+1VI67fZvkPtQVRf3B/5D/u13sZt4J+HchYU5jtzbS+6MMw3swbdp/jdbAfKA3C9QAdsv4Lok2PsEsJ15V2t2rlq9bnxaGXRcGEY8gklKDVhCCsIcOUlan1EBoE7bfr2Ca9z1Z2rtnAi+eZhz61BLwTGkUmW8WhAXcE/YCff1UPrxi6m08WrquWoLNX75PfLtWdGMuGpMKBwFaGKbK/YsFS0OqwYR0nUoWDjtDJzqX7/HlixMhfogmKjS/OgD1LjjYfIHG2YfWdRdJvqyTJU5WSJABquo+KmN1Hn6EWpN/J7c0uVUWPs54g6oakM3OEKHmGMp0WArjjZqvpD3xPkjdYCvLbIxDNYhmtAjRvEz52qYWg8+1fUyRgKot0U/44EPEFeXSQIEASdJ0/Pl66m4YRMV1qwL7Ud2qRekg+ticiBKLadJImAFWGjhXm2Ab7n+Q9uvrBc6nuopQok0FIsDjwZIHCJ3EwGZrD6Dsn++QWG6iSoAeo1wcv29VPzCJVS6Yh3xkrJpbW6O23v2UOuhB6izby+5ci91/vEUh8NNfP8d4spytRc1WDF6bzoMuYad3F/yktYUoLU1ZllO1lOguQ69NgNaRgJ0xOFgw8InF2Jwfy8vufWblJy9ksLheWrvfpz4tDK52koqXnopNnUOz4/8lFp/3BkkyTh17N99h5LKMmEM4fGs4GRkBk4z3JH2IDi9vuBdUvNIkDysPnYouEbP4Y8ztYGoAQmlscc911ym4Np7noE2fxWoeZgkKUSrPZu/SOkn1lBav5SaDz2gPmJbjf7TNt/0AMkikcTAqfMIufgYcf2oQ+6tkgIgIBaBVKDeqoQCtaKiyRAkGTCo+NkLyb85RfO/2El+psGiOzHhgHON7fcGYbW4YQMSQhPAtBbivfBe9dZKSI1a9AcdypGaIKAJ8K1C1WHxSgwnTJytGyJlPkhmZ0Kompq1UFJmJUnc6QMk9pG9+Br512YUBGWJliwV/8Emd57cpz5IleWsIDu8iEGpLMhiS4jAGApOgEvCaEZzpeC1dLpY3oxYnwdX/VeBdyuFfOJ8zFw136axpsrO9yEihajKvXoRA3CGhdlsIWdQEgTVFXFJ9M4BR6urQokaHGQJRqaVPRatOdzWmDRf1JokcLt9A24T9PN/T4dwqEHpJecZS5nWWmUFgIMbWMZJ7cOaPNkbU8bUohBbWCXEYK5pHhjEciTkajfCYjLjMu+mhcFcewIwep8A0RB7Wii5AtxAOm7cswdhLlPvLVcRLx9Q62AJcamXe2+5XmXQ+uvjCka7mFbsEdVQxZwTitpkARRaXdDRrHmyABB7E3JIFM+Ws0516HSrls9ZrNlCeqb8Oy1T8/c+SumGczlFlek7ZwX0+Dr5WSTGJYNqN9lLr1Hjnj9ZSyXm5ZLQzTjtXKIaYv2VhiTvjy0faT9KNY+jA7qSlcW8kqAjEqNRoF5bD6GvsLJfQyy3yWBWdKjFM9eO0ZIb6lTa9DGEe9D0NdugxtjD1NwxQTQPYy84yzpJSchBwi6VI4jvOe3USHXYiTYTH3SwztPoIXgfwiZtmvmfhI/Nsg2iZXEbmZquRJvWX2Y/Mx8otkvhUJNmb9tFc7c9RIUz+6Ujoeytd2OXgu0mlhwCkJeWKTlrJXWeeVG1p92LdHUuhsY6oKiCID3KhPv8C18fB6AZ1SG21BHNSSZraO0oUZne+awmSt/XLrIkilaEbXRNvvPqDGevTpMV/lhTo+2I5tL1F+nSnUefsxCr95mtmP9FP2xpl72/et/t486w8qhm8Hsy2ZkvWkLQO/c8ya3XZ2jgW5+mvms+yQQ2OmC6o4nk4vXSyagXRj90lgylJVy6+nIu33ClGntr4llNhpAngxizZHMn9z/prpNxS0u8dqwdqyStbCoF1AQwMfKGFT0lzgGCNK/lFUupdvdXuLii3xLxhQNou+ZNBPnN1ObzpAe/K6vapqnTvTFFszduR5M7ZU0uNCkNgtQ0lbZkpj5w45tFPqt6/+hk9173n3vHSMJ+SLrplEUe2Xu66/zYs6KPKhvOpr4NH6Ge1aeTQzU50cu/Pk3NB/9OrfseQaczHzsWHSp0Laqiepcrm+7q/8vPr+symLPoWv5lAKkqSPQSAMyJghOw6LJUpZm0QSzKK7A0Ht7IULUGPSZmU6rMxNwzMiZsSWuv2SjytZbYLfrNxIVJamXrq4+NTgquJAf46zd3Nq5adkUTl250akTmSNwtevFBmdnqHkfnjhd2f6cJC/2AUCIVMOS/02gFcByfBiUbgzwBcnD5TyLSkQ9VH/vZRFclR4bjd+fdOZqG8B1jLw9z0BCbRjW/pWyCQcw9WNVKrO2RMWiP9dELcjaDMRw/o/jDDncftsT/w7bqU7e+57n4qI+LOwbv3J0EX1cQMcRxriEtRCA5+MXhdRGI1H3XbX01D+LDQ8hBi21Z/y6gHe0beO7HFxyJ5ei/bqW8CZaxtyPepkMgwiPBUxb0KFDwQ4DTzzNVptNt2JDzsCC1IcfxfdeK9J7iF9HCvHMTM4fT9UeDcswHbmNybATZPGRsWZiTRSFfmIfcBW3OMazy4CpzyEDCmofZLMmYA0PbVjw/fPOxMBwXoII8b+xaANwCMLUFUOKPInfTomgucVIwF8KcaHeAFk+TU7VmdkeqVQnvDJJxeNXzP9h2vPVPCFBBrh6rAcwwEmFzEtlUVtkKXdLVndcn6/zcAmN61PZI58GPFuY7W8+aHJ4+0donBXAB6Hb8RJJugXLqCF2toF4pIfVib8HCqwwuZHRkDcimodRtrbnm6AUnAeyUAC5+PXj+9jqeFyTT10BHEv4aQFX08Rb9DsBNw2T3IuzjSZLtu+DZ747TKbz+C4GM4DFXMABbAAAAAElFTkSuQmCC";
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><hr class="my-4 border-t border-lime-500 dark:border-indigo-500"><footer class="flex container justify-center m-10 mx-auto"><div class="flex justify-between space-x-6"><div class="flex justify-center space-x-6"><div class="space-y-2 text-sm mx-4"><p class="text-base font-semibold tracking-wide text-gray-700 dark:text-gray-300">Контакты: </p><div class="flex"><p class="mr-1 text-gray-600 dark:text-gray-300">Телефон: </p><a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">+7(937)-297-99-97</a></div><div class="flex"><p class="mr-1 text-gray-600 dark:text-gray-300">Email: </p><a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">Nekit6681@yandex.ru</a></div></div></div><div class="flex justify-center space-x-4 mt-5 px-2"><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_0)}></a><a href="https://messenger.com" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_1)}></a><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_2)}></a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img${ssrRenderAttr("src", _imports_3)}></a></div></div></footer></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:hidden fixed bottom-0 left-0 z-50 w-full h-16" }, _attrs))}><div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium"><button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg><span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span></button><button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path clip-rule="evenodd" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path></svg><span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Wallet</span></button><button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg><span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Settings</span></button><button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path></svg><span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span></button></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BotomNav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navbar = __nuxt_component_0;
  const _component_NuxtLayout = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_Footer = __nuxt_component_3;
  const _component_BotomNav = __nuxt_component_4;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(ssrRenderComponent(_component_BotomNav, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/error-404-028bdfaf.js").then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/error-500-2070e82a.js").then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/island-renderer-ea2b5d0b.js").then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
export {
  _export_sfc as _,
  __nuxt_component_0$3 as a,
  appConfig as b,
  createError as c,
  useAppConfig as d,
  entry$1 as default,
  __nuxt_component_0$2 as e,
  mergeConfig as m,
  useHead as u
};
//# sourceMappingURL=server.mjs.map
