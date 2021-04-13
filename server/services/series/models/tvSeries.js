const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')


class TvSeries {
  static findAllSeries () {
    return getDatabase().collection('TvSeries').find().toArray()
  }

  static findOneSeries (longId) {
    return getDatabase().collection('TvSeries').findOne({ _id: ObjectId(longId) })
  }

  static addOneSeries (data) {
    return getDatabase().collection('TvSeries').insertOne(data)
  }

  static updateOneSeries (longId, data) {
    return getDatabase().collection('TvSeries').updateOne({ _id: ObjectId(longId) }, { $set: data })
  }

  static deleteOneSeries (longId) {
    return getDatabase().collection('TvSeries').deleteOne({ _id: ObjectId(longId)})
  }
}

module.exports = TvSeries