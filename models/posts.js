const mongoose = require('mongoose');
const postdetailss = new mongoose.Schema({
    P_text:{
       type: String,
       required:[true, 'must provide text']
    },
    P_img:{
       type: String,
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
    P_date:{type: Date, default: Date.now},
    P_uploadedby:{
        type:String,
    }
  })
  const posta = mongoose.model('postdetailss', postdetailss);
  module.exports = posta;