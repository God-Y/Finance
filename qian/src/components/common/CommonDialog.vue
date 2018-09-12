<template>
  <div class="common-footer" @click="hideDialog">
    <div class="footer-box">
      <div  ref="wrapper" class="wrapper">
        <ul class="content">
            <!-- <li v-for="item of bankList" :key="item.id" @click="getBank(item.name)">
              <svg class="icon" aria-hidden="true">
                  <use :xlink:href="item.href"></use>
              </svg>
              <span>
                {{item.name}}
              </span>
            </li> -->
            <li v-for="item of cardList" :key="item.id" @click="getBank(item.bankName)">
              <img :src="item.bankLogo" alt="" class="bank-logo">
              <span>
                {{item.bankName}}
              </span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "CommonDialog",
  data() {
    return {
      bankList: [
        { id: 1, href: "#icon-zhongguoyinhang-", name: "中国银行" },
        { id: 2, href: "#icon-gongshangyinhang-", name: "工商银行" },
        { id: 3, href: "#icon-yinhang-zhongguojianshe-", name: "建设银行" },
        { id: 4, href: "#icon-nongyeyinhang-", name: "农业银行" },
        { id: 5, href: "#icon-jiaotongyinhang-", name: "交通银行" },
        { id: 6, href: "#icon-youzhengyinhang-", name: "邮政银行" },
        { id: 7, href: "#icon-zhaoshangyinhang-", name: "招商银行" },
        { id: 8, href: "#icon-huaxiayinhang-", name: "华夏银行" },
        {
          id: 9,
          href: "#icon-guangzhoushishangyeyinhang-",
          name: "广州商业银行"
        },
        { id: 10, href: "#icon-beijingyinhang", name: "北京银行" },
        { id: 11, href: "#icon-nanjingyinhang", name: " 南京银行" },
        { id: 12, href: "#icon-pufayinhang", name: "浦发银行" },
        { id: 13, href: "#icon-zheshangyinhang", name: "浙商银行" },
        { id: 14, href: "#icon-tianjinyinhang", name: "天津银行" }
      ],
      cardList: []
    };
  },
  created() {
    this.getBankCards();
  },
  mounted() {
    if (!this.scroll) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      });
    } else {
      this.scroll.refresh();
    }
  },
  methods: {
    hideDialog() {
      this.$emit("hide");
    },
    getBank(value) {
      this.$emit("getbank", value);
    },
    getBankCards() {
      this.$api.bank.getBankCard().then(res => {
        let data = res.data;
        if (data.code) {
          this.cardList = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.common-footer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  .footer-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .wrapper {
    overflow: hidden;
    height: 300px;
    /* 全局的css样式 */
    .icon {
      width: 22px;
      height: 22px;
      fill: currentColor;
      overflow: hidden;
    }
    li {
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 15px;
      span {
        font-size: 16px;
        padding-left: 10px;
        letter-spacing: 2px;
      }
      .bank-logo {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
