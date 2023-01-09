var inputel = document.querySelector('#query');

var queryBuilder = function () {
  let value = inputel.value;
  return `{"model": "text-davinci-003", "prompt": "${value}", "temperature": 0, "max_tokens": 400}`
}


document.querySelector('#send').addEventListener('click', () => {

  //create loading element
  let image =  document.createElement("img");
  image.setAttribute("src", "assets/ellipsis-loader.gif");
  image.setAttribute("width", 35);
  image.classList = "loading-image";

  //add element to dom
  document.querySelector("#element").appendChild(image);


    //Create AJAX Object
    var req = new XMLHttpRequest();

    //Open Request
    req.open('POST', 'https://thetvmounters.com/api/test.php');

    //CallBack
    req.onreadystatechange = function () {
      if (req.readyState === 4) {

      // //Parse text
      let data = JSON.parse(req.responseText)
      // console.log(data)
      let text = data['choices'][0].text
      // //Filter Text
      text = text.replace(/\n/gm, '')

      setTimeout(function () {
        image.remove();
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

  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')

  let test = queryBuilder()
  req.send(`data=${test}`);
  inputel.value = ''
})
