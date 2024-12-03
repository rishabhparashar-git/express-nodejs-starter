const mongoose = require('mongoose');
class UserPipelines {
  getAllDetailsOfUser = (userId, loggedUserId) => {
    return [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'followers',
          localField: '_id',
          foreignField: 'target',
          as: 'followers'
        }
      },
      {
        $lookup: {
          from: 'followers',
          localField: '_id',
          foreignField: 'user',
          as: 'followings'
        }
      },
      {
        $lookup: {
          from: 'clbs',
          localField: '_id',
          foreignField: 'creator',
          as: 'clbs'
        }
      },
      {
        $unwind: {
          path: '$followers',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          isVerified: 1,
          role: 1,
          password: 1,
          createdAt: 1,
          updatedAt: 1,
          userName: 1,
          social: 1,
          bio: 1,
          cover: 1,
          picture: 1,
          followers: 1,
          followings: 1,
          clbs: 1,
          isFollow: {
            $cond: [
              {
                $eq: ['$followers.user', new mongoose.Types.ObjectId(loggedUserId)]
              },
              1,
              -1
            ]
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          isVerified: { $first: '$isVerified' },
          role: { $first: '$role' },
          password: { $first: '$password' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          userName: { $first: '$userName' },
          social: { $first: '$social' },
          bio: { $first: '$bio' },
          cover: { $first: '$cover' },
          picture: { $first: '$picture' },
          followers: { $push: '$followers' },
          followings: { $first: '$followings' },
          clbs: { $first: '$clbs' },
          isFollow: {
            $push: {
              $cond: [
                {
                  $eq: ['$isFollow', 1] // check in $cond if execution_price gt avg_exec_price
                },
                true,
                '$$REMOVE'
              ] //push data if true else blank
            }
          }
        }
      },
      {
        $unwind: {
          path: '$isFollow',
          preserveNullAndEmptyArrays: true
        }
      }
    ];
  };
}

exports.UserPipelines = new UserPipelines();
