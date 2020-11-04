<template>
  <div class="virtual-table">
    <div class="title" :style="titleStyle">
      <template v-for="(column, index) in columns">
        <div
          :key="column.dataIndex"
          :style="styles[index]"
          :class="['cell', !column.disableSort && sort ? 'sort' : '']"
          @click="onSort(column)"
        >
          <div class="text">{{ column.title }}</div>
        </div>
      </template>
    </div>
    <virtual-scroller
      class="virtual-scroll"
      :keyField="keyField"
      :style="{ height: `${height}px` }"
      :items="dataSource"
      :itemSize="rowHeight"
      v-slot="{ item }"
    >
      <div :class="['row']" @click="onClick(item)">
        <template v-for="(column, column_index) in columns">
          <div
            :key="column.dataIndex"
            :style="styles[column_index]"
            class="cell"
          >
            <slot
              :name="[column.scopedSlots]"
              :text="item[column.dataIndex]"
              :record="item"
              v-if="column.scopedSlots"
            />
            <template v-else>{{ item[column.dataIndex] }}</template>
          </div>
        </template>
      </div>
    </virtual-scroller>
  </div>
</template>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
import sort from "./sort.js";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export { sort };
export default {
  components: {
    "virtual-scroller": RecycleScroller,
  },
  props: {
    keyField: { type: String, default: "id" },
    sortBy: { type: String, default: "id" },
    sortDirection: { type: String, default: "descend" },
    height: { type: Number, default: 700 },
    rowHeight: { type: Number, default: 40 },
    columns: { type: Array, default: () => [] },
    dataSource: { type: Array, default: () => [] },
    rowClassName: { type: Function, default: () => ({}) },
    rowGetter: { type: Function, default: () => ({}) },
    sort: { type: Function },
  },
  methods: {
    onClick: function (item) {
      this.$emit("onClick", item);
    },
    onSort: function ({ dataIndex, disableSort }) {
      if (disableSort) {
        return;
      }
      let { sortDirection, sortBy } = this;
      switch (true) {
        case dataIndex !== sortBy:
          sortBy = dataIndex;
          sortDirection = "descend";
          break;
        case sortDirection === "descend":
          sortDirection = "ascend";
          break;
        default:
          sortDirection = "descend";
          break;
      }
      this.sort && this.sort({ sortBy, sortDirection });
    },
  },
  computed: {
    sortIcon: function () {
      return this.sortDirection === "descend" ? "caret-down" : "caret-up";
    },
    titleStyle: function () {
      if (this.dataSource.length * this.rowHeight > this.height) {
        return { marginRight: "17px" };
      }
    },
    styles: function () {
      return this.columns.map((item) => {
        if (item.width) {
          return {
            flex: `1 1 ${item.width}px`,
            overflow: "hidden",
            textAlign: item.align,
          };
        }
        return { flex: "1 1", overflow: "hidden", textAlign: item.align };
      });
    },
  },
};
</script>

<style>
.virtual-table {
  width: 100%;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  border-bottom: 0px;
}
.virtual-scroll {
  width: 100%;
  display: flex;
}
.virtual-scroll .hover {
  background-color: #fcebeb;
}
.virtual-table .title {
  display: flex;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.virtual-table .row {
  display: flex;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
}
.virtual-table .cell {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e8e8e8;
}
.virtual-table .cell .text {
  display: inline-block;
}
.virtual-table .icon {
  color: #1890ff;
}
.virtual-table .sort {
  user-select: none;
  cursor: pointer;
}
.virtual-table .sort:hover {
  background-color: #f2f2f2;
}
</style>
