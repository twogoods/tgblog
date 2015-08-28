function tgutil(){

}

tgutil.formatDate = function(date) {
  return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 "
   + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 };

module.exports = tgutil;