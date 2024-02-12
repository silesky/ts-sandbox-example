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

const pickBy = (obj, expr) => Object.keys(obj).reduce((acc, key) => {
  if (expr(key, obj[key])) {
    acc[key] = obj[key]
  }
  return acc
}, {})

const prettifyTrack = (arguments) => {
  if (!Array.isArray(arguments)) {
    arguments = Array.from(arguments)
  }

  const obj = {
    name: arguments[0],
    properties: arguments[1]
  }

  const normalized = pickBy(obj, (key, val) => {
    return Boolean(val)
  })
  return JSON.stringify(normalized, undefined, 2)
}

var analytics = {
  track: function () {
    eventStack.push(['analytics.track()', prettifyTrack(arguments)])
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
      document.getElementById('results').innerHTML = eventStack.map(el => `<li>${el.join(', ')}</li>`).join('\n')
    });
})

