var inputel = document.querySelector('#query');

var queryBuilder = function () {
  let value = inputel.value
  return `{"model": "text-davinci-003", "prompt": "${value}", "temperature": 0, "max_tokens": 400}`
}


document.querySelector('#send').addEventListener('click', () => {
    //Create AJAX Object
    var req = new XMLHttpRequest()

    //Open Request
    req.open('POST', 'https://api.openai.com/v1/completions')

    //CallBack
    req.onreadystatechange = function () {
      if (req.readyState === 4) {

      //Parse text
      let data = JSON.parse(req.responseText)
      console.log(data['choices'][0].text)
      let text = data['choices'][0].text

      //Filter Text
      text = text.replace(/\n/gm, '')
      //    console.log(text);

      /* 	document.body.insertAdjacentHTML("beforeend", `<p>${text}</p>`) */

      setTimeout(function () {
        const instance = new TypeIt('#element', {
          speed: 50
        })
          .type(`${text}`)
          .pause(5000)
          .delete(null, { speed: 6000 })
          .go()
      }, 300)

      setTimeout(() => {
        document.querySelector('#element').innerText = 'Ask me something else'
      }, 12000)
    }
  }

  req.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

  req.setRequestHeader(
    'Authorization',
    'Bearer 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'
  )

  let test = queryBuilder()
  req.send(test)
  inputel.value = ''
})
