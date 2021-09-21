const http = require('http')

const textNews = {
  title: "Life in Xinjiang, China",
  shortDescription: "Life in Xinjiang, China. Beyond the Mountains, More fantastic vision. Welcome to travel.",
  description: "Life in Xinjiang, China. Beyond the Mountains, More fantastic vision. Welcome to travel. Significant Improvements Have Been Made in Agricultural Economic Benefits. Learn More.",
  createAt: "2021-09-19 13:38:00z",
  updateAt: "2021-09-19 13:38:00z"
}

const videoNews = {
  title: "Nightly News Full Broadcast (September 18th)",
  shortDescription: "Confusion after FDA rejects Pfizer booster shot, fiancé of missing woman nowhere to be found, and Southern border crisis apparent in Del Rio, Texas.",
  createAt: "2021-09-19 13:34:00z",
  updateAt: "2021-09-19 13:34:00z",
  attachment: {
    type: 'video',
    src: {
      type: 'yourtube',
      href: 'https://www.youtube.com/embed/cpTSyrZpUCs'
    }
  }
}

const audioNews = {
  title: "SIAMÉS \"The Wolf\" [Official Animated Music Video]",
  shortDescription: "THE WOLF Animated Music Video\n" +
    "1st single from \"Bounce into The Music\" debut album.\n" +
    "Directed by Fer Suniga & RUDO Co. ",
  createAt: "2021-09-19 13:35:00z",
  updateAt: "2021-09-19 13:35:00z",
  attachment: {
    type: 'audio',
    src: {
      type: 'yourtube',
      href: 'https://www.youtube.com/embed/lX44CAz-JhU'
    }
  }
}


http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify([textNews, audioNews, videoNews][Math.round(Math.random() * 2)]))
}).listen(3010, ()=>{
  console.log('Server start on port 3010')
})
