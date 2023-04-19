<template>
  <div class="layout">
    <div class="layoutBorder">
    <div class="title">F1 Analysis</div>
    <div class="author">@Yansu Wang</div>
    <div class="layoutContent">
      <div class="summary">
        This system is mainly divided into three parts: Map, Driver's Standings,
        and Constructor's Standings.
      </div>
      <div class="router">
        <dis class="routerName">Map</dis>
        <li>
          Circuit: Views the global distribution of circuits and related
          information.
        </li>
        <li>
          Driver's Nationality: A heat map shows the distribution of drivers'
          nationalities worldwide.
        </li>
      </div>
      <div class="router">
        <dis class="routerName">Driver's Standings</dis>
        <li>
          Top 30 in History: This filters out the top 30 drivers who have won
          the most championships from 1950 to 2023.
        </li>
        <li>
          By Year: Views the driver standings by points for each season from
          year 2014-2023.
        </li>
      </div>
      <div class="router">
        <dis class="routerName">Constructor's Standings</dis>
        <li>
          Points: This compares the total historical points and average race
          points of constructors.
        </li>
        <li>
          By Year: Views the constructor standings by points for each season
          from year 2014-2023.
        </li>
      </div>
      <div class="data">
          * Data source: <a href="http://ergast.com/mrd/">Ergast API</a> and <a href="https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020">Kaggle</a><br/>
          * Data processing: Java script and Python
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style scoped="less">
.layout {
  display: flex;
  justify-content: center;
  font-size: 16px;
}
.layoutBorder {
    width: 830px;
    border: 1px soild #fff;
}
.author {
  text-align: center;
}
.title {
  font-size: 100px;
  text-align: center;
}

.layoutContent {
  margin-top: 20px;
  line-height: 40px;
}

.router {
  margin-top: 10px;
  margin-bottom: 20px;
}

.routerName {
  font-size: 25px;
}
.data{
  font-size: 8px;
  font-style: italic;
  line-height: 15px;
  margin-top: 50px;
}
</style>
