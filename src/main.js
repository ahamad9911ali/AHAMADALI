import './style.css'

const markets = {
  nifty: { name: 'NIFTY 50', short: 'N', description: "India's benchmark index", price: '24,876.35', move: '+112.60  +0.45%', pcr: '1.18', pcrChange: '+0.06', callOi: '8.96L', putOi: '10.57L', signal: 'BUY BIAS', signalClass: 'buy', detail: 'Put writing strengthens above 24,850', trend3: '↑ 0.42%', trend5: '↑ 0.56%' },
  banknifty: { name: 'BANKNIFTY', short: 'B', description: 'Banking sector index', price: '53,184.70', move: '+286.85  +0.54%', pcr: '0.86', pcrChange: '-0.04', callOi: '6.42L', putOi: '5.52L', signal: 'SELL BIAS', signalClass: 'sell', detail: 'Call writing visible near 53,300', trend3: '↓ 0.18%', trend5: '↓ 0.31%' },
  sensex: { name: 'SENSEX', short: 'S', description: 'BSE 30 index', price: '81,642.64', move: '+329.15  +0.40%', pcr: '1.03', pcrChange: '+0.01', callOi: '3.15L', putOi: '3.24L', signal: 'NEUTRAL', signalClass: 'neutral', detail: 'Balanced OI; wait for a breakout', trend3: '→ 0.05%', trend5: '↑ 0.09%' },
}

let selectedMarket = 'nifty'
let selectedFrame = '3'
const marketCards = document.querySelector('#marketCards')

function renderMarkets() {
  marketCards.innerHTML = Object.entries(markets).map(([id, market]) => `
    <button class="market-card ${id === selectedMarket ? 'selected' : ''}" data-market="${id}">
      <div class="card-top"><span class="index-dot ${id}">${market.short}</span><span class="market-name">${market.name}</span><span class="signal ${market.signalClass}">${market.signal}</span></div>
      <div class="market-price">${market.price}<small class="positive">${market.move}</small></div>
      <div class="metrics"><div><small>PCR</small><b>${market.pcr}</b><em class="${market.pcrChange.startsWith('-') ? 'negative' : 'positive'}">${market.pcrChange}</em></div><div><small>CALL OI</small><b>${market.callOi}</b></div><div><small>PUT OI</small><b>${market.putOi}</b></div></div>
      <div class="signal-detail"><span>3m ${market.trend3} · 5m ${market.trend5}</span><b>${market.detail}</b></div>
    </button>`).join('')
  document.querySelectorAll('.market-card').forEach((card) => card.addEventListener('click', () => selectMarket(card.dataset.market)))
}

function selectMarket(id) {
  selectedMarket = id
  const market = markets[id]
  document.querySelector('#indexBadge').textContent = market.short
  document.querySelector('#indexName').innerHTML = `${market.name} <span class="exchange">NSE</span>`
  document.querySelector('#indexDescription').textContent = market.description
  document.querySelector('#indexPrice').textContent = market.price
  document.querySelector('#indexMove').textContent = market.move
  renderMarkets()
  showToast(`${market.name} option chain loaded — ${selectedFrame}-minute signal selected.`)
}

renderMarkets()

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
document.querySelectorAll('.timeframes button').forEach((button) => button.addEventListener('click', () => {
  selectedFrame = button.dataset.frame
  document.querySelectorAll('.timeframes button').forEach((item) => item.classList.toggle('active', item === button))
  showToast(`${selectedFrame}-minute time frame applied to the signal engine.`)
}))
const dialog = document.querySelector('#signalDialog')
document.querySelector('#explainSignals').addEventListener('click', () => dialog.showModal())
document.querySelector('#closeDialog').addEventListener('click', () => dialog.close())
