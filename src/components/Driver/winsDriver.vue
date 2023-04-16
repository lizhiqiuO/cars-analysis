<template>
  <div ref="chart"></div>
</template>

<script>
import * as d3 from 'd3'
import {driverWinsOption} from '../../option/driverWinsOption'
export default {
  data () {
    return {
      data: [],
      margin: { top: 100, right: 20, bottom: 20, left: 20 },
      width: 500,
      height: 500
    }
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      driverWinsOption.sort((a, b) => a.x - b.x)
      this.data = [...driverWinsOption]
      const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      const xScale = d3.scaleLinear()
        .domain([driverWinsOption[0].x - 1, driverWinsOption[driverWinsOption.length - 1].x + 1])
        .range([0, this.width])

      const yScale = d3.scaleLinear()
        .domain([0, 15])
        .range([this.height, 0])

      const colorScale = d3.scaleOrdinal()
        .domain(this.data.map(d => d.name))
        .range(d3.schemeCategory10)

      // 创建 x 轴和 y 轴
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      // 设置坐标轴的样式
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis)
        .selectAll('text')
        .style('fill', 'white')

      svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .selectAll('text')
        .style('fill', 'white')

      const tooltip = d3.select(this.$refs.chart)
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid gray')
        .style('padding', '10px')

      // 绘制散点图
      svg.selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.name))
        .on('mouseover', (d) => {
          const {x, y, name, nationality} = d
          tooltip.style('visibility', 'visible')
            .html(`
              <div style="color: black">
                <div>
                  name:${name}
                </div>
                <div>
                  nationality:${nationality}
                </div>
                <div>
                  year:${x}
                </div>
                <div>
                  wins:${y}
                </div>
              </div>
            `)
            .style('left', `${d3.event.pageX + 10}px`)
            .style('top', `${d3.event.pageY + 10}px`)
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden')
        })

        // 初始化图例，将data_legend与图例绑定
      const legend = svg.selectAll('.legend')
        .data(this.data)
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
          // console.log(d, i)
          return 'translate(510,' + (i * 20 + 30) + ')'
        })  // transforsm属性便是整个图例的坐标

      // 绘制文字后方的颜色框或线
      legend.append('circle')
      .attr('r', 5)
      .attr('fill', d => colorScale(d.name))

        // 绘制图例文字
      legend.append('text')
      .attr('y', 15)
      .style('text-anchor', 'end') // 样式对齐
      .text(function (d) {
        return d.name
      })

      const domains = document.querySelectorAll('.domain')
      domains.forEach((domain) => {
        domain.style.stroke = 'white'
      })
    }
  }
}
</script>
