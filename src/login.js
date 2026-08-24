import './style.css'

const form = document.querySelector('#loginForm')
const token = document.querySelector('#accessToken')
const toast = document.querySelector('#loginToast')

document.querySelector('#showToken').addEventListener('click', () => {
  const isHidden = token.type === 'password'
  token.type = isHidden ? 'text' : 'password'
  document.querySelector('#showToken').textContent = isHidden ? '◉' : '◌'
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  toast.textContent = 'Demo mode: a secure DhanHQ server connection is required before sign-in.'
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3600)
})
