let filtersObj = {
  //时间过滤，
  time: function(date) {
    let value = new Date(date);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    return year + "-" + month + "-" + day;
  }
};

export default filtersObj;
