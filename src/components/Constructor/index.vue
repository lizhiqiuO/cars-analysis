<template>
  <div>
    <div class="title">
      <a-select
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
      Constructors's standings
    </div>
    <div class="spinning">
      <a-spin :spinning="spinning"></a-spin>
    </div>
    <div v-if="!spinning" class="cardInformation" v-for="(constructorItem, index) in constructorStandings">
      <div :key="index" class="card">
          <div class="information">
            <div class="constructor">
              {{constructorItem.constructor}}
            </div>
            <div class="driverStanding">
              <div class="position">{{constructorItem.position}}</div>
              <div class="wins"> wins: {{constructorItem.wins}}</div>
              <div class="points">points: {{constructorItem.points}}</div>
            </div>
          </div>
          <div class="img">
            <img class="imgItem" :src="constructorItem.imgUrl"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {getConstructorStandingInfo} from '../../data/api/ergast'
import {constructorOptions} from '../../option/constructorOption'
export default {
  data () {
    return {
      constructorStandings: [],
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
      this.getConstructorStandings(value)
    },
    getConstructorStandings (year) {
      getConstructorStandingInfo({}, year).then(res => {
        console.log(res)
        const {MRData: {StandingsTable: {StandingsLists}}} = res
        const {ConstructorStandings} = StandingsLists[0]
        const curConstructorStandings = ConstructorStandings.map((driverItem) => {
          const {Constructor, position, points, wins} = driverItem
          const {name: constructor} = Constructor
          let img = ''
          if (constructor.indexOf(' ') !== -1) {
            const constructorArr = constructor.split(' ')
            for (let i = 0; i < constructorArr.length; i++) {
              img = constructorArr[0].toLowerCase() + '_'
            }
            img = img + constructorArr[constructorArr.length - 1].toLowerCase()
          } else {
            img = constructor.toLowerCase()
          }
          let imgUrl = ''
          if (constructorOptions.has(img)) {
            imgUrl = '../../src/assets/cars/' + constructorOptions.get(img) + '.png'
          }
          console.log(imgUrl)
          return {
            constructor,
            position,
            points,
            wins,
            imgUrl
          }
        })

        console.log('curConstructorStandings', curConstructorStandings)
        this.constructorStandings = [...curConstructorStandings]
        this.spinning = false
      })
    }
  },
  components: {
  },
  mounted () {
    this.getSelectYear()
    this.getConstructorStandings(this.currentYear)
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
  .imgItem {
    transform: scale(0.7);
    width: 276px;
    margin-top: 26px;
  }
}

</style>
