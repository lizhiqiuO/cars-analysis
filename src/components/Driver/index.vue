<template>
  <div>
    <div class="title">
      <a-select
        :size="large"
        v-model="currentYear"
        @change="yearChange"
        style="width: 80px;margin-right: 20px;"
      >
        <a-select-option
          v-for="item in selectYear"
          :key="item.value"
          :value="item.value"
        >
          {{ item.value }}
        </a-select-option>
      </a-select>
      Driver's standings
    </div>
    <div class="spinning">
      <a-spin :spinning="spinning"></a-spin>
    </div>
    <div v-if="!spinning" class="cardInformation" v-for="(driverItem, index) in driverStandings">
      <div :key="index" class="card">
          <div class="information">
            <div class="name">
              {{driverItem.name}}
            </div>
            <div class="constructor">
              {{driverItem.constructor}}
            </div>
            <div class="driverStanding">
              <div class="position">{{driverItem.position}}</div>
              <div class="wins"> wins: {{driverItem.wins}}</div>
              <div class="points">points: {{driverItem.points}}</div>
            </div>
          </div>
          <div class="img">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {getDriverStandingInfo} from '../../data/api/ergast'
export default {
  data () {
    return {
      driverStandings: [],
      selectYear: [],
      currentYear: new Date().getFullYear(),
      spinning: true
    }
  },
  methods: {
    getSelectYear () {
      const selectYearOptions = []
      for (let i = this.currentYear; i > this.currentYear - 10; i--) {
        selectYearOptions.push({
          label: i,
          value: i
        })
      }
      this.selectYear = [...selectYearOptions]
    },
    yearChange (value) {
      this.spinning = true
      this.getDriverStandings(value)
    },
    getDriverStandings (year) {
      getDriverStandingInfo({}, year).then(res => {
        const {MRData: {StandingsTable: {StandingsLists}}} = res
        const {DriverStandings} = StandingsLists[0]
        const curDriverStandings = DriverStandings.map((driverItem) => {
          const {Constructors, Driver, position, points, wins} = driverItem
          const {name: constructor} = Constructors[0]
          const {familyName, givenName} = Driver
          return {
            name: givenName + ' ' + familyName,
            constructor,
            position,
            points,
            wins
          }
        })
        this.driverStandings = [...curDriverStandings]
        this.spinning = false
      })
    }
  },
  components: {
  },
  mounted () {
    this.getSelectYear()
    this.getDriverStandings(this.currentYear)
  }
}
</script>
<style scoped="sass">
.title {
  justify-content: center;
  align-items: center;
  font-size: 40px;
  display: flex;
  height: 80px;
}

.spinning {
  text-align: center;
}
.card {
  width: 492px;
  height: 174px;
  background-color: #1c1c1c;
  border-radius: 4px;
  display: flex;
  padding: 20px 10px 20px 10px;
  margin: 20px 0px 20px 0px;
  .information {
    width: 270px;
    .name {
    }
    .constructor {
      margin-bottom: 40px;
    }
    .driverStanding {
      display: flex;
      .position {
        width: 50px;
        height: 20px;
        background-color: rgba(210, 175, 26, 0.83);
        border-radius: 16px;
        margin-right: 10px;
        text-align: center;
      }
      .wins {
        width: 70px;
        height: 20px;
        background-color: #555;
        margin-right: 10px;
        text-align: center;
        border-radius: 16px;
      }
      .points {
        width: 100px;
        background-color: #555;
        border-radius: 16px;
        text-align: center;
      }
    }
  }
}

</style>
