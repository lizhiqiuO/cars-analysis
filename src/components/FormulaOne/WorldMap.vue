<template>
  <div class='mapChart' @dblclick="backToWorldMap">
    <div class='chart' ref="worldMap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {worldMapInfo, countryMapInfo} from '../../data/api/base'
import {getCircuitsInfo, getDriverInfo} from '../../data/api/ergast'
import {mapOption, circuitsScatterOption} from '../../option/mapOption'
import {countryPath} from '../../tool/country'
import {setStorage, getStorage, storageKey} from '../../tool/sessionStorage'
// import {countryToNationality} from '../../tool/countryToNationality'
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
    // this.getDrivers()
  },
  methods: {
    async getWorld () {
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
          const circuits = getStorage(storageKey.circuits)
          if (circuits) {
            this.showCircuits(circuits)
          } else {
            await getCircuitsInfo().then(res => {
              const {MRData: {CircuitTable: {Circuits}}} = res
              setStorage(storageKey.circuits, Circuits)
              this.showCircuits(Circuits)
            })
          }
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
      // 监听点击事件
      this.worldMapChart.on('click', function (params) {
        if (params.seriesType === 'scatter') {
          const {data: {name}} = params
          console.log('name', name)
          console.log('', this.$router)
          this.$router.push({
            path: 'formulaOne'
            // query: {
            //   name
            // }
          })
          console.log(params)
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
    },
    async getDrivers () {
      const drivers = getStorage(storageKey.drivers)
      if (drivers) {
        this.driversNation(drivers)
      } else {
        await getDriverInfo({limit: 1000}).then(res => {
          const {MRData: {DriverTable: {Drivers}}} = res
          setStorage(storageKey.drivers, Drivers)
          this.driversNation(Drivers)
        })
      }
    },
    driversNation (drivers) {
      /**
       * 维护
       * {
       *   nation: string,
       *   number: number,
       *   driverArr: array
       * }
       */
      const driverNationInfo = new Map()
      drivers.forEach(driverInfo => {
        const {nationality} = driverInfo
        if (driverNationInfo.has(nationality)) {
          const itemNation = driverNationInfo.get(nationality)
          const {number, driverArr} = itemNation
          const newDriverArr = [...driverArr]
          newDriverArr.push(driverInfo)
          driverNationInfo.set(nationality, {
            ...itemNation,
            number: number + 1,
            driverArr: newDriverArr
          })
        } else {
          const newDriverArr = []
          newDriverArr.push(driverInfo)
          driverNationInfo.set(nationality, {
            nation: nationality,
            number: 1,
            driverArr: newDriverArr
          })
        }
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
