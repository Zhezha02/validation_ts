import './style.scss'

const form = document.getElementById('form');

function init(form: HTMLFormElement) {

  window.addEventListener('keypress', ({key}) => {
    if (key === 'Enter') {
      form.requestSubmit();
    }
  })
  if (form.children instanceof HTMLCollection) {
    Array
      .from(form.children)
      .forEach(item => {
        if (item instanceof HTMLInputElement) {
          item.onchange = () => item.reportValidity()
        }

        if (item instanceof HTMLLabelElement) {
          const input = item.getElementsByTagName('input')[0]

          input.onchange = () => {
            input.reportValidity()
            if (input.files?.length) {
              const createdImg = document.createElement("img")
              createdImg.setAttribute('src', URL.createObjectURL(input.files[0]))
              createdImg.setAttribute('alt', input.files[0].name)
              createdImg.classList.add('img-wrapper')

              const currentImage = input.nextSibling
              if (currentImage instanceof HTMLImageElement) {
                item.replaceChild(createdImg, currentImage)
              } else {
                input.after(createdImg)
              }
            }
          }
        }
      })
  }
}

if (form instanceof HTMLFormElement) {
  form.onsubmit = (e) => {
    e.preventDefault()
    alert('Submit')
  }

  init(form)
}
