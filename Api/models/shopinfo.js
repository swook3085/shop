
module.exports = (sequelize, DataTypes) => {
  const shopInfo = sequelize.define('shopInfo', {
    product_name: DataTypes.STRING,
    product_price: DataTypes.STRING,
    supply_price: DataTypes.STRING,
    user_price: DataTypes.STRING,
    summary_desc: DataTypes.STRING,
    product_description: DataTypes.STRING,
    miFileName: DataTypes.STRING,
    aiFileName: DataTypes.STRING,
    exhibition:DataTypes.BOOLEAN,
    sale:DataTypes.BOOLEAN,
    deliveryWay:DataTypes.STRING,
    deliveryCost:DataTypes.STRING,
    deliveryPrice:DataTypes.STRING,
  }, {});
  shopInfo.associate = function(models) {
    // associations can be defined here
  };
  return shopInfo;
};