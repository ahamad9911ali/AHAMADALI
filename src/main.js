import './style.css'

const markets = {
  nifty: { name: 'NIFTY 50', short: 'N', description: "India's benchmark index", price: '24,876.35', move: '+112.60  +0.45%', pcr: '1.18', pcrChange: '+0.06', callOi: '8.96L', putOi: '10.57L', signal: 'STRONG BUY', signalClass: 'buy', detail: 'Put writing strengthens above 24,850', trend3: 'BUY', trend5: 'BUY', score: '12/15', strength: 'Strong' },
  banknifty: { name: 'BANKNIFTY', short: 'B', description: 'Banking sector index', price: '53,184.70', move: '+286.85  +0.54%', pcr: '0.86', pcrChange: '-0.04', callOi: '6.42L', putOi: '5.52L', signal: 'WAIT', signalClass: 'neutral', detail: '3M/5M signals conflict; wait for alignment', trend3: 'SELL', trend5: 'BUY', score: '2/15', strength: 'Moderate' },
  sensex: { name: 'SENSEX', short: 'S', description: 'BSE 30 index', price: '81,642.64', move: '+329.15  +0.40%', pcr: '1.03', pcrChange: '+0.01', callOi: '3.15L', putOi: '3.24L', signal: 'STRONG BUY', signalClass: 'buy', detail: 'Price and put support confirm the trend', trend3: 'BUY', trend5: 'BUY', score: '11/15', strength: 'Strong' },
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
      <div class="signal-detail"><span>3M: ${market.trend3} · 5M: ${market.trend5} · ${market.score}</span><b>${market.detail} · ${market.strength}</b></div>
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

const scanners = {
  bullish: [['1', 'ICICI BANK', 'Long build-up', 'BUY / BUY', '13/15', 'STRONG BUY'], ['2', 'RELIANCE', 'Call unwinding', 'BUY / BUY', '11/15', 'BUY'], ['3', 'TATA MOTORS', 'Put support', 'BUY / WAIT', '8/15', 'BUY']],
  bearish: [['1', 'HINDALCO', 'Short build-up', 'SELL / SELL', '−12/15', 'STRONG SELL'], ['2', 'DLF', 'Put unwinding', 'SELL / SELL', '−9/15', 'SELL'], ['3', 'INFY', 'Call addition', 'SELL / WAIT', '−6/15', 'SELL']],
}
const sectors = [['NIFTY BANK', 'STRONG BULLISH', '8', 'bullish'], ['NIFTY AUTO', 'BULLISH', '6', 'bullish'], ['NIFTY IT', 'BULLISH', '5', 'bullish'], ['NIFTY PHARMA', 'NEUTRAL', '0', 'neutral'], ['NIFTY METAL', 'BEARISH', '−5', 'bearish'], ['NIFTY REALTY', 'STRONG BEARISH', '−8', 'bearish']]
let scannerMode = 'bullish'
function renderScanner() {
  document.querySelector('#stockScanner').innerHTML = scanners[scannerMode].map((row) => `<button class="scanner-row stock-row"><span><b>${row[0]}</b> ${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span><b>${row[4]}</b><em class="${row[5].includes('SELL') ? 'negative' : 'positive'}">${row[5]}</em></button>`).join('')
}
function renderSectors() {
  document.querySelector('#sectorScanner').innerHTML = sectors.map((sector) => `<div class="sector-row"><span class="sector-mark ${sector[3]}"></span><b>${sector[0]}</b><span>${sector[1]}</span><strong class="${sector[3]}">${sector[2]}</strong></div>`).join('')
}
renderScanner(); renderSectors()
document.querySelectorAll('.scanner-tabs button').forEach((button) => button.addEventListener('click', () => { scannerMode = button.dataset.scanner; document.querySelectorAll('.scanner-tabs button').forEach((item) => item.classList.toggle('active', item === button)); renderScanner() }))
document.querySelector('#sectorInfo').addEventListener('click', () => dialog.showModal())

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
