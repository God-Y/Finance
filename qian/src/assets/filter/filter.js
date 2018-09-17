let filtersObj = {
  //时间过滤，
  time: function(date) {
    let value = new Date(date);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    return year + " - " + month + " - " + day;
  },
  timeSecond: function(date) {
    let value = new Date(date);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    let hour = value.getHours();
    let Minutes = value.getMinutes();
    let seconds = value.getSeconds();
    let twoValue = function(value) {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    };
    return `${year}-${month}-${day} ${twoValue(hour)}:${twoValue(
      Minutes
    )}:${twoValue(seconds)}`;
  },
  amount: function(val) {
    if (val !== undefined) {
      return Number(val)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
  } /* 债权列表出借金额 */,

  monthChnage: function(val) {
    if (val !== 7) {
      return val / 30;
    } else {
      return val;
    }
  } /* 月份转换 */,

  income: function(val) {
    if (val !== undefined) {
      return Number(val * 100).toFixed(2);
    }
  },
  amountInteger: function(val) {
    if (val !== undefined) {
      return val.toLocaleString("en-US");
    }
  } /* 债权列表出借金额 */,

  countTime: function(vals) {
    if (vals !== undefined) {
      let value = new Date(vals);
      let year = value.getFullYear();
      let month = ("0" + (value.getMonth() + 1)).slice(-2); //getMonth是从0开始，所以加+
      let day = ("0" + value.getDate()).slice(-2);
      return year + "." + month + "." + day;
    }
  } /* 日期格式 2018.02.02 */,

  repayment: function(val) {
    switch (val) {
      case 10:
        return "本息一次回款";
      case 20:
        return "分期付款";
    }
  },

  //银行卡 尾数
  tailNum(num) {
    if (num) {
      return num.slice(-4);
    }
  },

  //name
  name(name) {
    if (name) {
      return name.replace(/^(.).*(.)$/, "$1*$2");
    }
  },

  //phone
  changePhone(phone) {
    if (phone != undefined) {
      phone = phone.toString();
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  },

  //idnum
  changeID(id) {
    if (id) {
      id = id.toString();
      return id.replace(/(\d{3})\d{10}(\d{4})/, "$1****$2");
    }
  }
};

export default filtersObj;
