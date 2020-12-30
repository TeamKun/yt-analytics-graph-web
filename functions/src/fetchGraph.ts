import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { youtubeAnalytics_v2 } from 'googleapis'

module.exports = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    admin.auth().getUser(context.auth?.uid)
    new youtubeAnalytics_v2.Youtubeanalytics({ auth: context.auth })
    throw new functions.https.HttpsError("internal", "サーバーはオンラインモードではありません");
  });
