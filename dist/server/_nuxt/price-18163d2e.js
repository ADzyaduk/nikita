import { inject, ref, computed, defineComponent, toRef, mergeProps, useSSRContext, toRaw, unref } from "vue";
import { twMerge, twJoin } from "tailwind-merge";
import { c as checkbox, u as useUI, _ as __nuxt_component_1, a as __nuxt_component_2, o as omit, g as get, t as table } from "./Button-1a02680a.js";
import { useDebounceFn } from "@vueuse/core";
import { _ as _export_sfc, m as mergeConfig, b as appConfig } from "../server.mjs";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { upperFirst } from "scule";
import { defu } from "defu";
import "hookable";
import "destr";
import "devalue";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "ohash";
const useFormGroup = (inputProps, config2) => {
  const formBus = inject("form-events", void 0);
  const formGroup = inject("form-group", void 0);
  inject("form-inputs", void 0);
  const inputId = ref(inputProps == null ? void 0 : inputProps.id);
  const blurred = ref(false);
  function emitFormEvent(type, path) {
    if (formBus) {
      formBus.emit({ type, path });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formGroup == null ? void 0 : formGroup.name.value);
    blurred.value = true;
  }
  function emitFormChange() {
    emitFormEvent("change", formGroup == null ? void 0 : formGroup.name.value);
  }
  const emitFormInput = useDebounceFn(() => {
    if (blurred.value) {
      emitFormEvent("input", formGroup == null ? void 0 : formGroup.name.value);
    }
  }, 300);
  return {
    inputId,
    name: computed(() => (inputProps == null ? void 0 : inputProps.name) ?? (formGroup == null ? void 0 : formGroup.name.value)),
    size: computed(() => {
      var _a;
      const formGroupSize = config2.size[formGroup == null ? void 0 : formGroup.size.value] ? formGroup == null ? void 0 : formGroup.size.value : null;
      return (inputProps == null ? void 0 : inputProps.size) ?? formGroupSize ?? ((_a = config2 == null ? void 0 : config2.default) == null ? void 0 : _a.size);
    }),
    color: computed(() => {
      var _a;
      return ((_a = formGroup == null ? void 0 : formGroup.error) == null ? void 0 : _a.value) ? "red" : inputProps == null ? void 0 : inputProps.color;
    }),
    emitFormBlur,
    emitFormInput,
    emitFormChange
  };
};
let _id = 0;
function uid() {
  return `nuid-${_id++}`;
}
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.checkbox, checkbox);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      // A default value is needed here to bind the label
      default: () => uid()
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null
    },
    modelValue: {
      type: [Boolean, Array],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => config$1.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    inputClass: {
      type: String,
      default: ""
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: void 0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("checkbox", toRef(props, "ui"), config$1, toRef(props, "class"));
    const { emitFormChange, color, name, inputId } = useFormGroup(props);
    const toggle = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const onChange = (event) => {
      emit("change", event);
      emitFormChange();
    };
    const inputClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.background,
        ui.value.border,
        ui.value.ring.replaceAll("{color}", color.value),
        ui.value.color.replaceAll("{color}", color.value)
      ), props.inputClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      toggle,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      // eslint-disable-next-line vue/no-dupe-keys
      inputClass,
      onChange
    };
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><div class="flex items-center h-5"><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: _ctx.inputId,
    checked: Array.isArray(_ctx.toggle) ? ssrLooseContain(_ctx.toggle, _ctx.value) : _ctx.toggle,
    name: _ctx.name,
    required: _ctx.required,
    value: _ctx.value,
    disabled: _ctx.disabled,
    indeterminate: _ctx.indeterminate,
    type: "checkbox",
    class: ["form-checkbox", _ctx.inputClass]
  }, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.toggle))))}></div>`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="ms-3 text-sm"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass(_ctx.ui.label)}">`);
    ssrRenderSlot(_ctx.$slots, "label", {}, () => {
      _push(`${ssrInterpolate(_ctx.label)}`);
    }, _push, _parent);
    if (_ctx.required) {
      _push(`<span class="${ssrRenderClass(_ctx.ui.required)}">*</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</label>`);
    if (_ctx.help) {
      _push(`<p class="${ssrRenderClass(_ctx.ui.help)}">${ssrInterpolate(_ctx.help)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Checkbox.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.table, table);
function defaultComparator(a, z) {
  return a === z;
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  components: {
    UButton: __nuxt_component_1,
    UIcon: __nuxt_component_2,
    UCheckbox: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: null
    },
    by: {
      type: [String, Function],
      default: () => defaultComparator
    },
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: null
    },
    columnAttribute: {
      type: String,
      default: "label"
    },
    sort: {
      type: Object,
      default: () => ({})
    },
    sortButton: {
      type: Object,
      default: () => config.default.sortButton
    },
    sortAscIcon: {
      type: String,
      default: () => config.default.sortAscIcon
    },
    sortDescIcon: {
      type: String,
      default: () => config.default.sortDescIcon
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingState: {
      type: Object,
      default: () => config.default.loadingState
    },
    emptyState: {
      type: Object,
      default: () => config.default.emptyState
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: void 0
    }
  },
  emits: ["update:modelValue", "update:sort"],
  setup(props, { emit, attrs: $attrs }) {
    const { ui, attrs } = useUI("table", toRef(props, "ui"), config, toRef(props, "class"));
    const columns = computed(() => props.columns ?? Object.keys(omit(props.rows[0] ?? {}, ["click"])).map((key) => ({ key, label: upperFirst(key), sortable: false })));
    const sort = ref(defu({}, props.sort, { column: null, direction: "asc" }));
    const defaultSort = { column: sort.value.column, direction: null };
    const rows = computed(() => {
      var _a;
      if (!((_a = sort.value) == null ? void 0 : _a.column)) {
        return props.rows;
      }
      const { column, direction } = sort.value;
      return props.rows.slice().sort((a, b) => {
        const aValue = get(a, column);
        const bValue = get(b, column);
        if (aValue === bValue) {
          return 0;
        }
        if (direction === "asc") {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
    });
    const selected = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const indeterminate = computed(() => selected.value && selected.value.length > 0 && selected.value.length < props.rows.length);
    const emptyState = computed(() => {
      if (props.emptyState === null)
        return null;
      return { ...ui.value.default.emptyState, ...props.emptyState };
    });
    const loadingState = computed(() => {
      if (props.loadingState === null)
        return null;
      return { ...ui.value.default.loadingState, ...props.loadingState };
    });
    function compare(a, z) {
      if (typeof props.by === "string") {
        const property = props.by;
        return (a == null ? void 0 : a[property]) === (z == null ? void 0 : z[property]);
      }
      return props.by(a, z);
    }
    function isSelected(row) {
      if (!props.modelValue) {
        return false;
      }
      return selected.value.some((item) => compare(toRaw(item), toRaw(row)));
    }
    function onSort(column) {
      if (sort.value.column === column.key) {
        const direction = !column.direction || column.direction === "asc" ? "desc" : "asc";
        if (sort.value.direction === direction) {
          sort.value = defu({}, defaultSort, { column: null, direction: "asc" });
        } else {
          sort.value.direction = sort.value.direction === "asc" ? "desc" : "asc";
        }
      } else {
        sort.value = { column: column.key, direction: column.direction || "asc" };
      }
      emit("update:sort", sort.value);
    }
    function onSelect(row) {
      if (!$attrs.onSelect) {
        return;
      }
      $attrs.onSelect(row);
    }
    function selectAllRows() {
      props.rows.forEach((row) => {
        if (isSelected(row)) {
          return;
        }
        selected.value.push(row);
      });
    }
    function onChange(event) {
      if (event.target.checked) {
        selectAllRows();
      } else {
        selected.value = [];
      }
    }
    function getRowData(row, rowKey, defaultValue = "Failed to get cell value") {
      return get(row, rowKey, defaultValue);
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      sort,
      // eslint-disable-next-line vue/no-dupe-keys
      columns,
      // eslint-disable-next-line vue/no-dupe-keys
      rows,
      selected,
      indeterminate,
      // eslint-disable-next-line vue/no-dupe-keys
      emptyState,
      // eslint-disable-next-line vue/no-dupe-keys
      loadingState,
      isSelected,
      onSort,
      onSelect,
      onChange,
      getRowData
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UCheckbox = __nuxt_component_0$2;
  const _component_UButton = __nuxt_component_1;
  const _component_UIcon = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><table class="${ssrRenderClass([_ctx.ui.base, _ctx.ui.divide])}"><thead class="${ssrRenderClass(_ctx.ui.thead)}"><tr class="${ssrRenderClass(_ctx.ui.tr.base)}">`);
  if (_ctx.modelValue) {
    _push(`<th scope="col" class="${ssrRenderClass(_ctx.ui.checkbox.padding)}">`);
    _push(ssrRenderComponent(_component_UCheckbox, {
      checked: _ctx.indeterminate || _ctx.selected.length === _ctx.rows.length,
      indeterminate: _ctx.indeterminate,
      "aria-label": "Select all",
      onChange: _ctx.onChange
    }, null, _parent));
    _push(`</th>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList(_ctx.columns, (column, index) => {
    _push(`<th scope="col" class="${ssrRenderClass([_ctx.ui.th.base, _ctx.ui.th.padding, _ctx.ui.th.color, _ctx.ui.th.font, _ctx.ui.th.size, column.class])}">`);
    ssrRenderSlot(_ctx.$slots, `${column.key}-header`, {
      column,
      sort: _ctx.sort,
      onSort: _ctx.onSort
    }, () => {
      if (column.sortable) {
        _push(ssrRenderComponent(_component_UButton, mergeProps({ ..._ctx.ui.default.sortButton, ..._ctx.sortButton }, {
          icon: !_ctx.sort.column || _ctx.sort.column !== column.key ? _ctx.sortButton.icon || _ctx.ui.default.sortButton.icon : _ctx.sort.direction === "asc" ? _ctx.sortAscIcon : _ctx.sortDescIcon,
          label: column[_ctx.columnAttribute],
          onClick: ($event) => _ctx.onSort(column)
        }), null, _parent));
      } else {
        _push(`<span>${ssrInterpolate(column[_ctx.columnAttribute])}</span>`);
      }
    }, _push, _parent);
    _push(`</th>`);
  });
  _push(`<!--]--></tr></thead><tbody class="${ssrRenderClass(_ctx.ui.tbody)}">`);
  if (_ctx.loadingState && _ctx.loading) {
    _push(`<tr><td${ssrRenderAttr("colspan", _ctx.columns.length + (_ctx.modelValue ? 1 : 0))}>`);
    ssrRenderSlot(_ctx.$slots, "loading-state", {}, () => {
      _push(`<div class="${ssrRenderClass(_ctx.ui.loadingState.wrapper)}">`);
      if (_ctx.loadingState.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.loadingState.icon,
          class: _ctx.ui.loadingState.icon,
          "aria-hidden": "true"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass(_ctx.ui.loadingState.label)}">${ssrInterpolate(_ctx.loadingState.label)}</p></div>`);
    }, _push, _parent);
    _push(`</td></tr>`);
  } else if (_ctx.emptyState && !_ctx.rows.length) {
    _push(`<tr><td${ssrRenderAttr("colspan", _ctx.columns.length + (_ctx.modelValue ? 1 : 0))}>`);
    ssrRenderSlot(_ctx.$slots, "empty-state", {}, () => {
      _push(`<div class="${ssrRenderClass(_ctx.ui.emptyState.wrapper)}">`);
      if (_ctx.emptyState.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.emptyState.icon,
          class: _ctx.ui.emptyState.icon,
          "aria-hidden": "true"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass(_ctx.ui.emptyState.label)}">${ssrInterpolate(_ctx.emptyState.label)}</p></div>`);
    }, _push, _parent);
    _push(`</td></tr>`);
  } else {
    _push(`<!--[-->`);
    ssrRenderList(_ctx.rows, (row, index) => {
      _push(`<tr class="${ssrRenderClass([_ctx.ui.tr.base, _ctx.isSelected(row) && _ctx.ui.tr.selected, _ctx.$attrs.onSelect && _ctx.ui.tr.active, row == null ? void 0 : row.class])}">`);
      if (_ctx.modelValue) {
        _push(`<td class="${ssrRenderClass(_ctx.ui.checkbox.padding)}">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          modelValue: _ctx.selected,
          "onUpdate:modelValue": ($event) => _ctx.selected = $event,
          value: row,
          "aria-label": "Select row",
          onClick: () => {
          }
        }, null, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(_ctx.columns, (column, subIndex) => {
        var _a;
        _push(`<td class="${ssrRenderClass([_ctx.ui.td.base, _ctx.ui.td.padding, _ctx.ui.td.color, _ctx.ui.td.font, _ctx.ui.td.size, (_a = row[column.key]) == null ? void 0 : _a.class])}">`);
        ssrRenderSlot(_ctx.$slots, `${column.key}-data`, {
          column,
          row,
          index,
          getRowData: (defaultValue) => _ctx.getRowData(row, column.key, defaultValue)
        }, () => {
          _push(`${ssrInterpolate(_ctx.getRowData(row, column.key))}`);
        }, _push, _parent);
        _push(`</td>`);
      });
      _push(`<!--]--></tr>`);
    });
    _push(`<!--]-->`);
  }
  _push(`</tbody></table></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/data/Table.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const PricePage_vue_vue_type_style_index_0_scoped_a04c0dfc_lang = "";
const _sfc_main$1 = {
  __name: "PricePage",
  __ssrInlineRender: true,
  setup(__props) {
    const paintingServices = [
      {
        name: "Обеспыливание стен",
        price: 50,
        unit: "м²"
      },
      {
        name: "Грунтование стен",
        price: 50,
        unit: "м²"
      },
      {
        name: "Покраска стен (один слой)",
        price: 100,
        unit: "м²"
      },
      {
        name: "Покраска стен в 2 слоя",
        price: 180,
        unit: "м²"
      },
      {
        name: "Покраска потолка (один слой)",
        price: 150,
        unit: "м²"
      },
      {
        name: "Покраска потолка (2 слоя)",
        price: 250,
        unit: "м²"
      },
      {
        name: "Покраска коммуникаций",
        price: 300,
        unit: "п.м"
      },
      {
        name: "Покраска дверей скрытого монтажа",
        price: 1500,
        unit: "шт"
      },
      {
        name: "Покраска багетов",
        price: 200,
        unit: "п.м"
      },
      {
        name: "Покраска плинтусов",
        price: 200,
        unit: "п.м"
      },
      {
        name: "Покраска молдингов",
        price: 200,
        // Уточните цену
        unit: "от 200р"
      },
      {
        name: "Частичная шпаклевка царапин, сколов на стенах",
        price: 150,
        unit: "м²"
      },
      {
        name: "Покраска обоев (2 слоя)",
        price: 300,
        unit: "м²"
      },
      {
        name: "Покраска радиатора",
        price: 1e3,
        // Уточните цену
        unit: "шт"
      },
      {
        name: "Покраска подоконника (масляной краской)",
        price: 700,
        unit: "шт"
      },
      {
        name: "Покраска металлоконструкций",
        price: 100,
        unit: "п.м"
      },
      {
        name: "Укрывка окон",
        price: 150,
        unit: "м²"
      },
      {
        name: "Укрывка полов",
        price: 70,
        unit: "м²"
      },
      {
        name: "Укрывание прочих элементов",
        price: 0,
        // Уточните цену
        unit: "оговаривается"
      }
    ];
    const selectedServices = ref([]);
    function selectService(service) {
      const index = selectedServices.value.findIndex((item) => item.name === service.name);
      if (index === -1) {
        selectedServices.value.push({ name: service.name, price: service.price });
      } else {
        selectedServices.value.splice(index, 1);
      }
    }
    function calculateTotal() {
      return selectedServices.value.reduce((sum, service) => sum + service.price, 0);
    }
    function getRowClass(service) {
      return {
        "selected-row": selectedServices.value.some((item) => item.name === service.name)
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTable = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-10" }, _attrs))} data-v-a04c0dfc>`);
      _push(ssrRenderComponent(_component_UTable, {
        rows: paintingServices,
        onSelect: selectService,
        "row-class": getRowClass
      }, null, _parent));
      if (unref(selectedServices).length > 0) {
        _push(`<div data-v-a04c0dfc><p data-v-a04c0dfc>Итого: ${ssrInterpolate(calculateTotal())} руб.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PricePage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a04c0dfc"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_PricePage = __nuxt_component_0;
  _push(ssrRenderComponent(_component_PricePage, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/price.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const price = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  price as default
};
//# sourceMappingURL=price-18163d2e.js.map
