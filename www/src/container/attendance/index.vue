<template>
  <a-row :gutter="16" :class="$style.row">
    <a-col :xs="24" :lg="8">
      <a-card>
        <PieChart />
      </a-card>
    </a-col>
    <a-col :xs="24" :lg="16">
      <a-card>
        <Table />
      </a-card>
    </a-col>
    <a-col :xs="24">
      <a-card title="Seating plan is prototype">
        <SeatingPlan />
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { Col, Row, Card } from "ant-design-vue";
import Table from "./table.vue";
import API from "../../actions/api.js";
import PieChart from "./pie-chart.vue";
import SeatingPlan from "./seating-plan.vue";

const api = new API();

export default {
  components: {
    PieChart,
    Table,
    SeatingPlan,
    "a-row": Row,
    "a-col": Col,
    "a-card": Card,
  },
  data() {
    return {
      packages: {},
    };
  },
  mounted() {
    this.fet = api.getAttendance();
    this.fet.then((data) => {
      this.$store.commit("setAttendance", data);
    });
  },
};
</script>
<style module>
.row :global .ant-col {
  margin-bottom: 16px;
}
</style>
