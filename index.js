const pull = require('pull-stream')
const file = require('pull-file')
const {stdin} = require('pull-stdio')

module.exports = function(ssb, argv, cb) {
  const target = argv._[0]

  let publish
  if (argv.dryRun) {
    publish = function(content, cb) {
      console.error('Would publish:')
      cb(null, {key: '{KEY}', value: {content}})
    }
  } else {
    publish = ssb.publish
  }

  let {name, description, image} = argv

  upload(image, (err, blob) =>{
    if (err) return cb(err)
    if (blob) image = blob
    const content = {
      type: 'about',
      about: target,
      name, description, image
    }
    if (!content.name) delete content.name
    if (!content.description) delete content.description
    if (!content.image) delete content.image
    publish(content, (err, result) =>{
      if (err) return cb(err)
      console.log('%o', result)
      cb(null, result)
    }) 
  })

  function upload(image, cb) {
    if (!image) return cb()
    pull(
      image == '-' ? stdin() : file(image),
      ssb.blobs.add(null, cb)
    )
  }
}
