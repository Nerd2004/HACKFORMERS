const mongoose = require('mongoose');
const postdetailss = new mongoose.Schema({
    P_text:{
       type: String,
       required:[true, 'must provide text']
    },
    P_id:{
      type: Number,
      default: Math.floor(
       Math.random() * (99999 - 11111 + 1) + 11111
     )
    },
    P_likes:{
      type: Number,
       default: 0
    },
    P_url:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113__340.jpg"

    },
    P_date:{type: Date, default: Date.now},
    P_uploadedby:{
        type:String,
    }
  })
  const posta = mongoose.model('postdetailss', postdetailss);
  module.exports = posta;