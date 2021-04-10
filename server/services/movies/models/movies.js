const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')


class Movies {
  static findAllMovie () {
    return getDatabase().collection('Movies').find().toArray()
  }

  static findOneMovie (longId) {
    return getDatabase().collection('Movies').findOne({ _id: ObjectId(longId) })
  }

  static addOneMovie (data) {
    return getDatabase().collection('Movies').insertOne(data)
  }

  static updateOneMovie (longId, data) {
    return getDatabase().collection('Movies').updateOne({ _id: ObjectId(longId) }, { $set: data })
  }

  static deleteOneMovie (longId) {
    return getDatabase().collection('Movies').deleteOne({ _id: ObjectId(longId)})
  }
}

module.exports = Movies