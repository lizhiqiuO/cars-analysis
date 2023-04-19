<template>
  <div class="map">
    <div class="button">
      <a-button type="primary" ghost class="constructor" @click="clickConstructor">Circuit map</a-button>
      <a-button type="primary" ghost class="wins" @click="clickWins">Driver's nationality map</a-button>
    </div>
    <div class='mapChart'>
      <div class='chart' ref="worldMap"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {worldMapInfo} from '../../data/api/base'
import {getCircuitsInfo} from '../../data/api/ergast'
import {mapOption, circuitsScatterOption} from '../../option/mapOption'
import {winsCountry} from '../../option/mapDataOption'
import {setStorage, getStorage, storageKey} from '../../tool/sessionStorage'
export default {
  data () {
    return {
      worldMapChart: {},
      // 显示二级页面
      showCountryMap: false,
      // 全局的 option
      global_option: {}
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
      await worldMapInfo().then(res => {
        const worldMap = this.$refs.worldMap
        this.worldMapChart = echarts.init(worldMap)
        echarts.registerMap('world', res)
        const {geo, legend, tooltip} = mapOption
        this.global_option = {
          legend,
          tooltip,
          geo: {
            map: 'world',
            ...geo
          }
        }
        this.worldMapChart.setOption({...this.global_option})
        this.$nextTick(async () => {
          await getCircuitsInfo().then(res => {
            const {MRData: {CircuitTable: {Circuits}}} = res
            setStorage(storageKey.circuits, Circuits)
            this.showCircuits(Circuits)
          })
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
      this.global_option = {...this.global_option,
        visualMap: {
          show: false
        },
        series: [
          {
            ...circuitsScatterOption,
            data: circuitsScatter
          }]
      }
      this.worldMapChart.setOption({
        ...this.global_option
      })
      // 监听点击事件
      this.worldMapChart.on('click', (params) => {
        console.log('params', params)
        if (params.seriesType === 'scatter') {
          console.log(params)
          const {data: {name}} = params
          console.log('name', name)
          console.log('', this.$router)
          this.$router.push({
            path: 'Circuits',
            query: {
              name
            }
          })
        }
      })
    },
    // 热力图
    showHeatMap () {
      const heatMapData = winsCountry.map(country => {
        const {longitude, latitude, number} = country
        return [longitude, latitude, number]
      })
      this.global_option = {...this.global_option,
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          show: true
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: heatMapData
          }
        ]
      }
      this.worldMapChart.setOption({
        ...this.global_option
      })
      this.spinning = false
    },
    clickConstructor () {
      const circuits = getStorage(storageKey.circuits)
      this.showCircuits(circuits)
    },
    clickWins () {
      this.showHeatMap()
    }
  }
}
</script>
<style scoped="less">
.button {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  .constructor {
    margin-right: 100px;
  }
}
.mapChart {
  width: 100%;
  display: flex;
  justify-content: center;
}
.mapChart .chart {
  height: 700px;
  width: 1000px;
}
</style>
