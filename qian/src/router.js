import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import StartPage from "./views/user/Start.vue"; //引导页
import Login from "./views/user/Login.vue"; //登陆页
import FindPassword from "./views/user/FindPassword.vue"; //登陆页
import Register from "./views/user/Register.vue"; /* 注册页 */
import UserProtocol from "./views/user/UserProtocol.vue"; /* 用户协议 */
import PrivasyClause from "./views/user/PrivacyClause.vue"; /* 隐私条款 */
import Commend from "./views/Commend/Commend.vue"; /* 推荐页 */
import MePage from "./views/Me/Me.vue"; /* 推荐页 */
import bannerDetailed from "./views/Commend/BannerDetailed.vue"; /* banner详情页 */
import financingList from "./views/Financing/FinancingList.vue"; /* 理财列表 */
import productList from "./views/Financing/productList.vue"; /* 理财列表 */
import addList from "./views/Financing/AddList.vue"; /* 续投列表 */
import productCount from "./views/Financing/ProductCount.vue"; /* 计算收益 */
import conutOne from "./views/Financing/productCount/CountOne.vue"; /* 计算页面一 */
import conutTwo from "./views/Financing/productCount/CountTwo.vue"; /* 计算页面一 */
import TradingFlow from "./views/Me/TradingFlow.vue"; /* 交易流水 */
import TradingDetial from "./views/Me/TradingDetial.vue"; /* 交易流水详情 */
import productDetailed from "./views/Financing/productDetailed.vue"; /* 产品详情 */
import moreDetailed from "./views/Financing/MoreDetailed.vue"; /* 查看更多产品信息 */
import compactOne from "./views/Financing/compacts/CompactOne.vue"; /* 出借咨询与服务协议 */
import signatrue from "./views/Financing/compacts/signatrue.vue"; /* 签名 */
import compactContent from "./views/Financing/compacts/CompactContent.vue"; /* 合同内容 */
import gesture from "./views/AccountSetting/gesture.vue"; /* 手势密码 */

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/start", //启动页
      name: "start",
      component: StartPage
    },
    {
      path: "/login", //登录页
      name: "login",
      component: Login
    },
    {
      path: "/commend",
      name: "commend",
      component: Commend
    },
    {
      path: "/find-password", //找回密码
      name: "findPassword",
      component: FindPassword
    },
    {
      path: "/register", //注册页
      name: "register",
      component: Register
    },
    {
      path: "/user-protocol", //用户协议
      name: "userProtocol",
      component: UserProtocol
    },
    {
      path: "/privasy-clause", //隐私条款
      name: "privasyClause",
      component: PrivasyClause
    },
    {
      path: "/me", //我的页面
      name: "me",
      component: MePage
    },
    {
      path: "/trading-flow/:pages", //交易流水
      name: "trading-flow",
      component: TradingFlow
    },
    {
      path: "/trading-detial/:id", //交易流水详情
      name: "tradingDetial",
      component: TradingDetial
    },
    {
      path: "/my-investment", //我的投资页面
      name: "myInvestment",
      component: () => import("./views/Investment/MyInvestment.vue")
    },
    {
      path: "/investment-detial/:id", //投资详情
      name: "investment-detial",
      component: () => import("./views/Investment/InvestDetial.vue")
    },
    {
      path: "/backCard-manage", //银行卡
      name: "backCard-manage",
      component: () => import("./views/BankCard/BankCardManage.vue")
    },
    {
      path: "/add-backCard", //银行卡
      name: "add-backCard",
      component: () => import("./views/BankCard/AddBankCard.vue")
    },
    {
      path: "/message", //投资详情
      name: "message",
      component: () => import("./views/Msg/msg.vue")
    },
    /* 推荐 */
    {
      path: "/bannerDetailed",
      name: "bannerDetailed",
      component: bannerDetailed
    } /* 推荐banner图详情 */,
    {
      path: "/financingList",
      component: financingList,
      children: [
        {
          path: "",
          component: productList
        } /* 产品列表 */,
        {
          path: "addList",
          component: addList
        } /* 增加list */
      ]
    },
    {
      path: "/productCount",
      component: productCount,
      meta: {
        keepAlive: false // 不需要被缓存
      },
      children: [
        {
          path: "",
          component: conutOne,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        } /* 计算金额 */,
        {
          path: "/productCount/conutTwo",
          name: "conutTwo",
          component: conutTwo,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        } /* 分月计算金额页面 */
      ]
    },
    {
      path: "/productDetailed",
      name: "productDetailed",
      component: productDetailed
    } /* 产品详情 */,
    {
      path: "/moreDetailed",
      name: "moreDetailed",
      component: moreDetailed
    } /* 查看更多详情 */,
    {
      path: "/compactOne",
      // name: "compactOne",
      component: compactOne,
      meta: {
        keepAlive: false // 不需要被缓存
      },
      children: [
        {
          path: "signatrue",
          name: "signatrue",
          component: signatrue
        } /* 签名 */,
        {
          path: "",
          name: "compactContent",
          component: compactContent,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        } /* 合同内容 */
      ]
    },
    {
      path: "/renewal",
      name: "renewal",
      component: () => import("./views/Financing/renewal/ProductRenewal.vue")
    } /* 产品续投 */,
    {
      path: "/renewalDetailed",
      name: "renewalDetailed",
      component: () => import("./views/Financing/renewal/RenawalDetailed.vue")
    } /* 产品续投 */,
    {
      path: "/gesture",
      name: "gesture",
      component: gesture
    }, //手势密码
    {
      path: "/uploadImg",
      name: "uploadImg",
      component: () => import("./views/AccountSetting/Verified/UploadImg.vue")
    }
  ]
});
