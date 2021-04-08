const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')


class TvSeries {
  static findAllSeries () {
    return getDatabase().collection('TV Series').find().toArray()
  }

  static findOneSeries (longId) {
    return getDatabase().collection('TV Series').findOne({ _id: ObjectId(longId) })
  }

  static addOneSeries (data) {
    return getDatabase().collection('TV Series').insertOne(data)
  }

  static updateOneSeries (longId, data) {
    return getDatabase().collection('TV Series').updateOne({ _id: ObjectId(longId) }, { $set: data })
  }

  static deleteOneSeries (longId) {
    return getDatabase().collection('TV Series').deleteOne({ _id: ObjectId(longId)})
  }
}

module.exports = TvSeries