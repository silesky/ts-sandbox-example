const signals = [
  {
    anonymousId: "abc123",
    type: "UIInteraction",
    data: {
      control: "Button",
      info: "click",
      label: "Checkout"
    },
  },
  {
    anonymousId: "abc123",
    type: "Navigation",
    data: {
      url: "https://segment.com",
      pathname: "/docs",
      referrer: "https://google.com?search=1234",
    },
  },
];
document.getElementById("test-signals").innerHTML = JSON.stringify(
  signals,
  undefined,
  2
);

var eventStack = []

const trackArgsToObject = (arguments) => {
  if (!Array.isArray(arguments)) {
    arguments = Array.from(arguments)
  }
  return Object.keys({
    name: arguments[0]
    properties: JSON.stringify(arguments[1])
  }).reduce(k => ({
    const v = acc[k]
   if(v) {
      acc[k] = v
    }
  }, {}))
}
var analytics = {
  track: function () {
    eventStack.push(['analytics.track()', `name: ${arguments[0]}`, arguments[1] && `properties: ${JSON.stringify(arguments[1])}`].join(' | '))
  },
  page: function () {
    eventStack.push(['page()'])
  },
}


const currentSignal = signals[0] // TODO

document.getElementById('test-btn').addEventListener('click', () => {
  eventStack = []
  tsProxy.getEmitOutput(model.uri.toString())
    .then((r) => {
      // show compiled code in html
      console.log(r.outputFiles[0].text)
      eval(r.outputFiles[0].text)
      triggerFn(currentSignal)
      console.log(eventStack)
      document.getElementById('results').innerHTML = eventStack.map(el => `<li>${el}</li>`).join('\n')
    });
})

