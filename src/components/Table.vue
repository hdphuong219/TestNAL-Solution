<template>
  <div class="table-components">
    <b-table
      v-bind:items="items"
      v-bind:fields="fields"
      v-bind:no-items-view="noItemsPage"
      hover
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
    >
      <template #table-caption>{{ caption }}</template>
      <template
        v-for="(x, slotName) in $scopedSlots"
        v-slot:[slotName]="context"
      >
        <slot :name="slotName" v-bind="context" />
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Tables",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    noItemsPage: {
      type: Object,
      default() {
        return {
          noResults: "No refinement results.",
          noItems: "No existing items.",
        };
      },
    },
    caption: {
      type: String,
      default() {
        return "";
      },
    },
    sortBy: {
      type: String,
      default() {
        return "";
      },
    },
    sortDesc: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
<style lang="scss">
.table-components {
  overflow-x: auto;
  .table {
    h2 {
      font-size: 20px !important;
      font-weight: 500 !important;
    }
  }
}
</style>
