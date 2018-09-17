<template>
  <ul class="alb" >
    <li 
      v-for="item of letters" 
      :key="item"
      @click='handleLetterClick'
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchmove="handleTouchMove"
      :ref="item"
    >{{item}}</li> 
  </ul>
</template>
<script>
export default {
  name: "CityAlb",
  props: {
    cities: {
      type: Object
    }
  },
  data() {
    return {
      touchStatus: false,
      timer: null //用于设置定时器，提升性能
    };
  },
  computed: {
    letters() {
      let letters = Object.keys(this.cities);
      console.log();
      return letters;
    }
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("changeLetter", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          //设置一个timer来提升性能，事件间隔设置为20ms
          const touchY = e.touches[0].clientY - 159;
          const index = ~~(touchY / 21);
          if (index > 0 && index < this.letters.length) {
            this.$emit("changeLetter", this.letters[index]);
          }
        }, 20);
      }
    },
    handleTouchEnd() {
      this.touchStatus = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.alb {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 110px;
  width: 20px;
  li {
    width: 100%;
    text-align: center;
    line-height: 21px;
    font-size: 16px;
    color: #00bad4;
  }
}
</style>
