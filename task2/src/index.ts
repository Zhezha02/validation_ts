import Ajv, {JSONSchemaType} from "ajv"
import fetch from "node-fetch";
// const fetch = require('node-fetch')

const SERVER_URL = 'http://localhost:3010'
const ajv = new Ajv()

let fetchedTextNews, fetchedVideoNews, fetchedAudioNews

interface News {
  title: string,
  shortDescription: string
  createAt: string
  updateAt: string
}

// type Src = {
//   type: 'string',
//   href: 'string'
// }

type Attachment = {
  myType: string
}


interface TextNews extends News {
  description: string
}

interface VideoNews {
  attachment: {
    a: string,
    b: {
      c: number
    }
  }
}

// interface AudioNews extends News {
//   attachment: {
//     type: 'video'
//   }
//   src: {
//     type: string
//     href: string
//   }
// }


(async function saveTextNews(): Promise<void> {
  const response = await fetch(SERVER_URL)
  const news = await response.json()

  const TextNewsSchema: JSONSchemaType<TextNews> = {
    type: "object",
    properties: {
      title: {type: "string"},
      shortDescription: {type: "string"},
      description: {type: "string"},
      createAt: {type: "string"},
      updateAt: {type: "string"},
    },
    required: ["title", "shortDescription", "description", "createAt", "updateAt"]
  }

  const validateTextNews = ajv.compile(TextNewsSchema)

  if (validateTextNews(news)) {
    fetchedTextNews = news
    console.log('SAVE TEXT NEWS')
  } else {
    console.log('TRY AGAIN')
    await saveTextNews()
  }
})();

(async function saveVideoNews(): Promise<void> {
  const response = await fetch(SERVER_URL)
  const news = await response.json()

/*  const schema: JSONSchemaType<VideoNews> = {
    type: "object",
    properties: {
      title: {type: "string"},
      shortDescription: {type: "string"},
      createAt: {type: "string"},
      updateAt: {type: "string"},
      attachment: {
        type: "object",
        properties: {
          type: {type: 'string'}
        }
      }
    },
    required: ["title", "shortDescription", "createAt", "updateAt", "attachment"]
  }*/
  const schema: JSONSchemaType<VideoNews> & {
    definitions: {
      attachment: JSONSchemaType<VideoNews["attachment"]>
      attachmentB: JSONSchemaType<VideoNews["attachment"]["b"]>
    }
  } = {
    type: "object",
    definitions: {
      attachment: {
        type: "object",
        properties: {
          a: {type: "string"},
          b: {$ref: "#/definitions/attachmentB"}
        },
        required: ["a"],
      },
      attachmentB: {
        type: "object",
        properties: {
          c: {type: "number"},
        },
        required: ["c"],
      }
    },
    dependencies: {},
    properties: {
      attachment: {$ref: "#/definitions/attachment"}
    },
    additionalProperties: false,
    required: ["attachment"]
  } as const

  const validateVideoNews = ajv.compile(schema)

  // const VideoNewsSchema: JSONSchemaType<VideoNews> = {
  //   // anyOf: [],
  //   // oneOf: [],
  //   type: "object",
  //   properties: {
  //     title: {type: "string"},
  //     shortDescription: {type: "string"},
  //     createAt: {type: "string"},
  //     updateAt: {type: "string"},
  //     attachment: {
  //       type: "object",
  //       properties: {
  //         type: {const: 'video'}
  //         // myType: {type: "string"},
  //       }
  //     }
  //   },

  // "$defs": {
  //   attachment: {
  //     type: "object",
  //     properties: {
  //       type: {type:'string'},
  //       src: {"$ref": '#/$defs/src'}
  //     }
  //   },
  //   src: {
  //     type: "object",
  //     properties: {
  //       type: {type: "string"},
  //       href: {type: "string"},
  //     }
  //   }

  // },
  //   required: ["title", "shortDescription", "createAt", "updateAt", "attachment"]
  // }

  // const validateVideoNews = ajv.compile(VideoNewsSchema)

  if (validateVideoNews(news)) {
    fetchedVideoNews = news
    console.log('SAVE VIDEO NEWS')
    console.log(fetchedVideoNews)
  } else {
    console.log('TRY AGAIN')
    await saveVideoNews()
  }
})()

//
// const AudioNewsSchema: JSONSchemaType<AudioNews> = {
//   type: "object",
//   properties: {
//     title: {type: "string"},
//     shortDescription: {type: "string"},
//     createAt: {type: "string"},
//     updateAt: {type: "string"},
//     attachment: {
//       type: "object",
//       properties: {
//         type: {
//           const: "video"
//         }
//       }
//     },
//     src: {
//       type: "object",
//       properties: {
//         type: {type: 'string'},
//         href: {type: 'string'}
//       }
//     }
//   },
//   required: ["title", "shortDescription", "createAt", "updateAt"]
// }
//
// const validateVideoNews = ajv.compile(VideoNewsSchema)
//
// if (validateVideoNews(news)) {
//   fetchedVideoNews = news
//   console.log('SAVE VIDEO NEWS')
// } else {
//   console.log('TRY AGAIN')
//   await saveVideoNews()
// }
// })
// ()