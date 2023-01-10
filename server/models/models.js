import { sequelize_db } from "../db.js";
import { DataTypes, Sequelize } from 'sequelize'

export const User = sequelize_db.define('user',{
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    email : { type : DataTypes.STRING, unique : true },
    password : { type : DataTypes.STRING },
    role : { type : DataTypes.STRING, defaultValue : 'USER'},
})

export const Basket = sequelize_db.define('basket', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
})

export const BasketComics = sequelize_db.define('basket_comics', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    countComics : { type : DataTypes.INTEGER, allowNull : false},
})

export const Comics = sequelize_db.define('comics', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    name : { type : DataTypes.STRING, unique : true, allowNull : false},
    description : { type : DataTypes.STRING, allowNull : false },
    price : { type : DataTypes.INTEGER, allowNull : false },
    raiting : { type : DataTypes.FLOAT, defaultValue : 0 },
    img : { type : DataTypes.STRING, allowNull : false },
})

export const Category = sequelize_db.define('category', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    name : { type : DataTypes.STRING, unique : true, allowNull : false },
})

export const Brand = sequelize_db.define('brand', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : { type : DataTypes.STRING, unique : true, allowNull : false },
})

export const Raiting = sequelize_db.define('raiting', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    rate : { type : DataTypes.INTEGER, allowNull : false },
})

export const ComicsInfo = sequelize_db.define('comics_info', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    title : { type : DataTypes.STRING, allowNull : false },
    description : { type : DataTypes.STRING, allowNull : false },
})

export const ComicsComment = sequelize_db.define('comics_comment',{
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    text : { type : DataTypes.TEXT, allowNull : false },
    dateCreate : { type : DataTypes.DATE, allowNull : false, defaultValue : Sequelize.fn('now') },
})

export const CategoryBrand = sequelize_db.define('category_brand', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
})

export const Order = sequelize_db.define('order', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    dateOrder : { type : DataTypes.DATE, allowNull : false, defaultValue : Sequelize.fn('now') },
    status : { type : DataTypes.INTEGER, allowNull : false},
})

export const OrderComics = sequelize_db.define('order_comics', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    countComics : { type : DataTypes.INTEGER, allowNull : false },
})

export const OrderInfo = sequelize_db.define('order_info', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    title : { type : DataTypes.STRING, allowNull : false },
    description : { type : DataTypes.STRING, allowNull : false },
    dateCreate : { type : DataTypes.DATE, allowNull : false, defaultValue : Sequelize.fn('now') },
})

export const BanerImg = sequelize_db.define('baner_img', {
    id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
    img : { type: DataTypes.STRING, allowNull : false },
    link : { type : DataTypes.STRING, allowNull : false },
    description : { type : DataTypes.STRING, allowNull : false },
}) 

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Basket.hasMany(BasketComics)
BasketComics.belongsTo(Basket)

Order.hasMany(OrderComics)
OrderComics.belongsTo(Order)

Category.hasMany(Comics)
Comics.belongsTo(Category)

Brand.hasMany(Comics)
Comics.belongsTo(Brand)

Comics.hasMany(BasketComics)
BasketComics.belongsTo(Comics)

Comics.hasMany(OrderComics)
OrderComics.belongsTo(Comics)

Comics.hasMany(ComicsInfo, { as: 'info'})
ComicsInfo.belongsTo(Comics)

Comics.hasMany(ComicsComment, { as: 'comment'})
ComicsComment.belongsTo(Comics)

User.hasMany(ComicsComment)
ComicsComment.belongsTo(User)

ComicsComment.hasOne(Raiting)
Raiting.belongsTo(ComicsComment)

Order.hasMany(OrderInfo , { as: 'info'})
OrderInfo.belongsTo(Order)

Category.belongsToMany(Brand, { through : CategoryBrand })
Brand.belongsToMany(Category, { through : CategoryBrand })