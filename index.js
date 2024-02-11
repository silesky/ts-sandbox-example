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

var eventBuffer = []
var analytics = {
  track: function () {
    eventBuffer.push(['analytics.track()', `event: ${arguments[0]}`].join(' | '))
  },
  page: function () {
    eventBuffer.push(['page()'])
  },
}


const currentSignal = signals[0] // TODO

document.getElementById('test-btn').addEventListener('click', () => {
  eventBuffer = []
  tsProxy.getEmitOutput(model.uri.toString())
    .then((r) => {
      // show compiled code in html
      console.log(r.outputFiles[0].text)
      eval(r.outputFiles[0].text)
      triggerFn(currentSignal)
      console.log(eventBuffer)
      document.getElementById('results').innerHTML = eventBuffer.map(el => `<li>${el}</li>`).join('\n')
    });
})

