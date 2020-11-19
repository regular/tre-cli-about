module.exports = bin =>
  `${bin} TARGET ` +
  '[--name NAME] ' +
  '[--description DESC] ' +
  '[--image FILE|-] ' +
  '[--dryRun] ' +
  '[--config CONFIG] ' +
  '[--help]'
