<template>
  <div class="search-city" >
    <common-header title="选择城市"></common-header>
    <search-input :cities="cities" ></search-input>
    <city-list 
      :cities="cities" 
      :letter="letter"
    ></city-list>
    <city-alb :cities="cities" @changeLetter="handleChangeLetter"></city-alb>
    <div class="footer-box">
      <div  ref="wrapper" class="wrapper">
        <ul class="content">
            
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "common/CommonHeader";
import SearchInput from "@/components/SearchCity/SearchInput.vue";
import CityList from "@/components/SearchCity/CityList.vue";
import CityAlb from "@/components/SearchCity/alb.vue";
import cities from "@/assets/js/city.json";
export default {
  name: "CommonDialog",
  components: {
    CommonHeader,
    SearchInput,
    CityList,
    CityAlb
  },
  data() {
    return {
      cities: cities,
      letter: ""
    };
  },

  methods: {
    handleChangeLetter(value) {
      this.letter = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.search-city {
  background: #fff;
}
</style>
