<template>
  <div class='mapChart' @dblclick="backToWorldMap">
    <div class='chart' ref="worldMap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {worldMapInfo, countryMapInfo} from '../../data/api/base'
import {getCircuitsInfo} from '../../data/api/ergast'
import {mapOption, circuitsScatterOption} from '../../option/mapOption'
import {countryPath} from '../../tool/country'
export default {
  data () {
    return {
      worldMapChart: {},
      // 显示二级页面
      showCountryMap: false
    }
  },
  props: {
  },
  watch: {
  },
  mounted () {
    this.getWorld()
  },
  methods: {
    async getWorld () {
      console.log('mapOption', mapOption)
      await worldMapInfo().then(res => {
        const worldMap = this.$refs.worldMap
        this.worldMapChart = echarts.init(worldMap)
        echarts.registerMap('world', res)
        const {geo, legend, tooltip} = mapOption
        this.worldMapChart.setOption({
          legend,
          tooltip,
          geo: {
            map: 'world',
            ...geo
          }
        })
        this.$nextTick(async () => {
          await getCircuitsInfo().then(res => {
            const {MRData: {CircuitTable: {Circuits}}} = res
            this.showCircuits(Circuits)
          })
        })
        this.worldMapChart.on('dblclick', async (params) => {
          const {name} = params
          this.showCountry(name)
        })
      })
    },
    showCircuits (circuits) {
      const circuitsScatter = circuits.map(circuitsItem => {
        const {circuitName, Location: {lat, long}} = circuitsItem
        return {
          name: circuitName,
          value: [Number(long), Number(lat), circuitsItem]
        }
      })
      this.worldMapChart.setOption({
        series: {
          ...circuitsScatterOption,
          data: circuitsScatter
        }
      })
    },
    async showCountry (country) {
      const path = countryPath(country)
      if (path) {
        await countryMapInfo({url: path}).then(res => {
          echarts.registerMap(path, res)
          this.worldMapChart.setOption({
            geo: {
              map: path
            }
          })
          this.$nextTick(() => {
            this.showCountryMap = true
          })
        })
      }
    },
    async backToWorldMap () {
      this.worldMapChart.setOption({
        geo: {
          map: 'world'
        }
      })
      this.$nextTick(() => {
        this.showCountryMap = false
      })
    }
  }
}
</script>
<style scoped>
.mapChart {
  width: 100%;
}
.mapChart .chart {
  height: 800px;
  width: 1400px;
}
</style>
