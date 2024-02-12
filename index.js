const signals = [
  // {
  //   anonymousId: "foo",
  //   type: "UIInteractionSignal",
  //   data: {
  //     control: "Button",
  //     info: "foo"
  //   },
  // },
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
var analytics = {
  track: function () {
    eventStack.push(['analytics.track()', `event: ${arguments[0]}`].join(' | '))
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

