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

const prettifyStackItem = ([methodName, args]) => {
  if (!Array.isArray(args)) {
    args = Array.from(args)
  }

  const obj = {
    name: args[0],
    properties: args[1]
  }

  const normalized = pickBy(obj, (key, val) => val !== undefined)
  const v = JSON.stringify(normalized, undefined, 2)
  return [`${methodName} event`.toUpperCase(), v].join(', ')
}

// crete a buffered analytics
var analytics = {};
['track', 'page', 'identify'].forEach(m => {
  analytics[m] = function () {
    eventStack.push([m, arguments])
  }
})


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
      document.getElementById('results').innerHTML = eventStack.map(item => `<li>${prettifyStackItem(item)}</li>`).join('\n')
    });
})


