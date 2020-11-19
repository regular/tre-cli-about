# tre-cli-about

Publishes about messages with name, description and image properties to an ssb network.
Uploads image files as blobs and supports reading images from stdin.

```
USAGE

  tre-cli-about TARGET [--name NAME] [--description DESC] [--image FILE|-] [--dryRun] [--config CONFIG] [--help]

DESCRIPTION

  tre-cli-about posts an about message, will upload blobs when needed

  TARGET               about target (might be feed id, message id or anything else)
  --name NAME          sets about.name
  --description DESC   sets about.description
  --image FILE         uploads FILE as a blob and sets about.image to resulting blob id. If FILE is '-' (minus), STDIN is read.
  --dryRun             do not publish any messages and show diagnostic output
  --config CONFIG      path to JSON file with caps.shs, defaults to .trerc (see FILES)
  --help               show help

FILES
  
  If --config CONFIG is not given, tre-cli-about looks for a file named .trerc in the current directory or above. (and other locations, see rc on npm for details)
  That JSON formatted file must have a property called csps.shs (the network key). The network key is used to discover a ssb server on the local network that shares its manifest with us. This usually only is the case, if it uses the same ssb id (e.g. tre server started from the same directory), or our ssb id is authorized by the server to call manifest() (e.g. bay-of-pleny started with --authorize or ssb-server started with our public key in config.master)

  Auto-discovery ony works if the server uses ssb-lan to broadcasts its address. Bay-of-plenty and tre server do this.

EXAMPLE

  tre-cli-about @foobar... --image avatar.svg --dryRun

```

---
License: MIT Copyright 2020 Jan Bölsche <jan@lagomorph.de> (https://regular.codes/)

