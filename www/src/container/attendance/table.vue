<template>
  <div>
    <vue-virtual-table
      keyField="nodeid"
      :dataSource="sort_data"
      :columns="columns"
      :height="260"
    >
      <template v-slot:desknumber="{ text, record }">
        <a-badge :color="getStatus(record)" :text="`${text}`" />
      </template>
      <template v-slot:firstname="{ record }">
        {{ getName(record) }}
      </template>
      <template v-slot:parent="{ text }">
        {{ getManager(text) }}
      </template>
    </vue-virtual-table>
  </div>
</template>
<script>
import VueVirtualTable from "../../component/vue-virtual-table/index.vue";
import { Badge } from "ant-design-vue";
import _ from "lodash";
const columns = [
  {
    dataIndex: "firstname",
    title: "Name",
    scopedSlots: "firstname",
  },
  // { dataIndex: "employeetitle", title: "Employeetitle" },
  {
    dataIndex: "desknumber",
    title: "Desknumber",
    scopedSlots: "desknumber",
  },
  { dataIndex: "parent", title: "Manager", scopedSlots: "parent" },
];

export default {
  data() {
    return {
      columns,
    };
  },
  components: {
    "vue-virtual-table": VueVirtualTable,
    "a-badge": Badge,
  },
  computed: {
    data: function () {
      return this.$store.state.attendance.data;
    },
    data_index: function () {
      return _.keyBy(this.data, "nodeid");
    },
    filter_data: function () {
      const select = this.$store.state.attendance.select;
      let outofoffice;
      switch (select) {
        case "absent":
          outofoffice = true;
          break;
        case "present":
          outofoffice = false;
          break;
      }
      if (select) {
        return _.filter(this.data, ["outofoffice", outofoffice]);
      } else {
        return this.data;
      }
    },
    sort_data: function () {
      return _.orderBy(this.filter_data, ["desknumber"], ["asc"]);
    },
  },
  methods: {
    getStatus: function (record) {
      return record.outofoffice ? "#f1662f" : "#a7df40";
    },
    getName: function ({ firstname, lastname }) {
      return `${firstname} ${lastname}`;
    },
    getManager: function (nodeid) {
      const row = this.data_index[nodeid];
      if (row) {
        return this.getName(row);
      }
      return nodeid;
    },
  },
};
</script>
<style module></style>
