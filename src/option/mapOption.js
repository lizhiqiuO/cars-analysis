const mapGeoOptions = {
  show: true,
  aspectScale: 0.75,
  itemStyle: {
    areaColor: 'rgba(5,16,82,1)',
    borderWidth: 1, // 描边线宽 为 0 时无描边
    borderColor: 'rgba(43,177,189,0.1)', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
    borderType: 'solid' // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
  },
  // 高亮状态下的多边形和标签样式
  emphasis: {
    label: {
        // 是否显示标签
      show: true,
      // 文字的颜色
      color: '#fff'
    },
    itemStyle: {
        // 地图区域的颜色
      areaColor: 'rgba(64,205,205,0.5)'
    }
  }
}

const mapTooltip = {
  trigger: 'item'
}

const mapLegend = {
  show: true,
// 图例列表的布局朝向
  orient: 'vertical',
  textStyle: {
    color: 'white'
  },
  type: 'plain',
  z: 10
}

export const mapOption = {
  geo: {
    ...mapGeoOptions
  },
  tooltip: {
    ...mapTooltip
  },
  legend: {
    ...mapLegend
  }
}

export const circuitsScatterOption = {
  type: 'scatter',
  coordinateSystem: 'geo',
  symbol: 'image://../src/assets/option/circuit.png',
  symbolSize: 25,
  // hover 联动高亮
  legendHoverLink: true,
  hoverAnimation: true,
  // 坐标点颜色
  itemStyle: {
    color: '#fff'
  },
  z: 10,
  tooltip: {
    backgroundColor: 'rgba(100,100,255,1)',
    formatter: function (params) {
      // console.log(params)
      const {value} = params
      const {circuitId, circuitName, Location: {country, locality}} = value[2]
      return `
        <div>
          <div>id: ${circuitId}</div>
          <div>name: ${circuitName}</div>
          <div>locality: ${locality}</div>
          <div>country: ${country}</div>
          <div>image: <image style="width: 100px;" src='../src/assets/tracks/${circuitId}.png'></image></div>
        </div>
      `
    }
  }
}
