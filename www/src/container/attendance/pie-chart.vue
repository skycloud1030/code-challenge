<template>
  <vue-echart
    :options="pieOption"
    autoresize
    :class="$style.echarts"
    @pieselectchanged="pieselectchanged"
  ></vue-echart>
</template>
<script>
import ECharts from "vue-echarts";
import numeral from "numeral";
import { initOptions } from "../../component/charts/index.js";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import _ from "lodash";

export default {
  components: {
    "vue-echart": ECharts,
  },

  data() {
    return {
      isMount: false,
      data: undefined,
      legend: [],
    };
  },
  watch: {
    "$store.state.attendance.data": function(data) {
      let groupds = _.groupBy(data, "outofoffice");
      this.legend = ["Present", "Absent"];
      this.data = [
        { value: _.size(groupds.false), name: "Present" },
        { value: _.size(groupds.true), name: "Absent" },
      ];
    },
  },
  computed: {
    pieOption: function() {
      if (this.isMount && this.data) {
        return {
          ...initOptions,
          legend: {
            orient: "horizontal",
            bottom: 0,
            data: this.legend,
            selectedMode: false,
          },
          series: [
            {
              name: "Attendance",
              type: "pie",
              hoverAnimation: false,
              selectedOffset: 4,
              // silent: true,
              selectedMode: "single",
              center: ["50%", "50%"],
              radius: ["0%", "50%"],
              label: {
                show: true,
                formatter: function({ name, percent, value }) {
                  return `${name}\n${numeral(value).format(
                    "0.[00] a"
                  )} (${percent}%)`;
                },
              },
              data: this.data,
            },
          ],
        };
      }
    },
  },
  mounted() {
    this.isMount = true;
  },
  methods: {
    pieselectchanged: function({ selected }) {
      let select;
      switch (true) {
        case selected.Absent === true:
          select = "absent";
          break;
        case selected.Present === true:
          select = "present";
          break;
        default:
          select = "";
          break;
      }
      this.$store.commit("setAttendanceSelect", select);
    },
  },
};
</script>
<style module>
.echarts {
  width: 100%;
  height: 300px;
}
</style>
