<template>
  <div>
    <div class="sum" ref="consturctor_sum"></div>
    <div ref="consturctor_per_race"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import {consturctorSum, consturctorPerRace} from '../../option/constructorOption'

export default {
  name: 'BarChart',
  data () {
    return {
    }
  },
  mounted () {
    this.drewBars(this.$refs.consturctor_sum, consturctorSum, 'consturctor sum')
    this.drewBars(this.$refs.consturctor_per_race, consturctorPerRace, 'consturctor per race')
  },
  methods: {
    drewBars (ref, barData, text) {
// 设置svg的宽和高
      const width = 600
      const height = 300
      const margin = { top: 100, right: 105, bottom: 20, left: 50 }

    // 创建SVG元素
      const svg = d3.select(ref)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // 定义柱状图的x轴比例尺
      const xScale = d3.scaleBand()
      .domain(barData.map(d => d.name))
      .range([0, width])
      .padding(0.1)

    // 定义柱状图的y轴比例尺
      const yScale = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.value)])
      .range([height, 0])

      const tooltip = d3.select(ref)
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid gray')
        .style('padding', '10px')

    // 绘制柱状图
      svg.selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .attr('fill', (d, i) => `${d.color}`)
      .on('mouseover', (d) => {
        const {name, value} = d
        tooltip.style('visibility', 'visible')
            .html(`
              <div style="color: black">
                <div>
                  name:${name}
                </div>
                <div>
                  value:${value}
                </div>
              </div>
            `)
            .style('left', `${d3.event.pageX + 10}px`)
            .style('top', `${d3.event.pageY + 10}px`)
      })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden')
        })

    // 绘制x轴
      const xAxis = d3.axisBottom(xScale)
      svg.append('g')
        .attr('class', 'x-axis')
        .call(xAxis)
        .attr('transform', `translate(0, ${height})`)
        .selectAll('text')
        .style('fill', 'white')

      // 绘制y轴
      const yAxis = d3.axisLeft(yScale)
      svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('fill', 'white')
      // 加个标题
      svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .text(`${text}`)

      // 添加图例
      const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(600, 0)`)

      legend.selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 30)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d, i) => `${d.color}`)

      legend.selectAll('text')
      .data(barData)
      .enter()
      .append('text')
      .attr('x', 30)
      .attr('y', (d, i) => i * 30 + 15)
      .text(d => d.name)
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'middle')
      .attr('fill', '#fff')
    }
  }
}
</script>

<style>
.sum {
  margin-bottom: 100px;
}
.domain {
  stroke: white;
}
</style>
