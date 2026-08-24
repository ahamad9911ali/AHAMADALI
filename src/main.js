import './style.css'

const rows = [
  ['2.84L', '154.20', '+18.65%', '12.4%', '24,700', '1.96L', '6.15', '-28.91%', '14.8%'],
  ['3.18L', '112.35', '+21.02%', '11.9%', '24,750', '2.22L', '8.40', '-25.66%', '14.2%'],
  ['4.67L', '76.85', '+27.12%', '11.3%', '24,800', '3.48L', '12.50', '-21.38%', '13.6%'],
  ['6.15L', '48.40', '+32.42%', '10.8%', '24,850', '5.91L', '18.90', '-16.75%', '13.1%'],
  ['8.96L', '27.10', '+38.97%', '10.4%', '24,900', '8.24L', '28.75', '-11.81%', '12.7%'],
  ['7.42L', '13.85', '+44.27%', '10.2%', '24,950', '7.65L', '42.40', '-7.72%', '12.4%'],
  ['5.28L', '6.70', '+50.11%', '10.5%', '25,000', '6.44L', '59.15', '-4.14%', '12.2%'],
]

const optionRows = document.querySelector('#optionRows')
optionRows.innerHTML = rows.map((row, index) => `
  <button class="option-row ${index === 4 ? 'atm' : ''}" data-strike="${row[4]}">
    <span>${row[0]}</span><strong>${row[1]}</strong><em>${row[2]}</em><span>${row[3]}</span>
    <b class="strike">${row[4]} ${index === 4 ? '<small>ATM</small>' : ''}</b>
    <span>${row[5]}</span><strong>${row[6]}</strong><em class="negative">${row[7]}</em><span>${row[8]}</span>
  </button>`).join('')

const toast = document.querySelector('#toast')
const showToast = (message) => { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600) }

document.querySelectorAll('.option-row').forEach((row) => row.addEventListener('click', () => {
  const strike = row.dataset.strike
  document.querySelector('#contractName').textContent = `NIFTY ${strike} CE`
  document.querySelector('.place-order').childNodes[0].textContent = `Buy NIFTY ${strike} CE `
  document.querySelectorAll('.option-row').forEach((item) => item.classList.remove('atm'))
  row.classList.add('atm')
}))

let quantity = 50
document.querySelector('#qtyUp').addEventListener('click', () => { quantity += 50; document.querySelector('#quantity').textContent = quantity })
document.querySelector('#qtyDown').addEventListener('click', () => { quantity = Math.max(50, quantity - 50); document.querySelector('#quantity').textContent = quantity })
document.querySelectorAll('.buy-sell button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.buy-sell button').forEach((item) => item.classList.remove('active'))
  button.classList.add('active')
  const action = button.textContent
  const name = document.querySelector('#contractName').textContent
  document.querySelector('.place-order').childNodes[0].textContent = `${action[0] + action.slice(1).toLowerCase()} ${name} `
  document.querySelector('.place-order').classList.toggle('sell-order', action === 'SELL')
}))
document.querySelector('#placeOrder').addEventListener('click', () => showToast('Order ticket created — review and confirm in DhanHQ.'))
document.querySelector('#clearContract').addEventListener('click', () => showToast('Select a strike from the option chain.'))
