// WhatsApp checkout helper for Foodiezone.
// Builds a wa.me URL with a pre-filled order message.
// `phone` should be in international format WITHOUT the leading '+' or '00' (e.g. "27781234567").
//
// TODO: replace with real Foodiezone WhatsApp number
export const FOODIEZONE_WA = '27000000000'
export const FOODIEZONE_WA_URL = `https://wa.me/${FOODIEZONE_WA}`

export type CartLine = {
  name: string
  qty: number
  price: number // in ZAR
  variant?: string
}

export type CustomerInfo = {
  name?: string
  phone?: string
  address?: string
  notes?: string
}

export type OrderMode = 'delivery' | 'pickup' | 'dine-in' | 'booking'

export function formatZAR(value: number): string {
  return `R${value.toFixed(2)}`
}

export function buildWhatsAppOrderText(opts: {
  business: string
  mode?: OrderMode
  lines: CartLine[]
  customer?: CustomerInfo
  deliveryFee?: number
  paymentMethod?: string
}): string {
  const { business, mode = 'delivery', lines, customer = {}, deliveryFee = 0, paymentMethod } = opts
  const itemLines = lines
    .map((l) => {
      const v = l.variant ? ` (${l.variant})` : ''
      return `• ${l.qty}× ${l.name}${v} = ${formatZAR(l.qty * l.price)}`
    })
    .join('\n')
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0)
  const total = subtotal + deliveryFee

  const heading = mode === 'booking'
    ? `Hi ${business}, I'd like to book the following services:`
    : `Hi ${business}, I'd like to place an order:`

  const customerBlock = [
    customer.name ? `Name: ${customer.name}` : 'Name: ',
    customer.phone ? `Phone: ${customer.phone}` : 'Phone: ',
    mode === 'delivery' ? (customer.address ? `Delivery address: ${customer.address}` : 'Delivery address: ') : '',
    paymentMethod ? `Payment: ${paymentMethod}` : '',
    customer.notes ? `Notes: ${customer.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const totalsBlock = deliveryFee > 0
    ? [`Subtotal: ${formatZAR(subtotal)}`, `Delivery fee: ${formatZAR(deliveryFee)}`, `Total: ${formatZAR(total)}`].join('\n')
    : `Total: ${formatZAR(total)}`

  return [
    heading,
    '',
    itemLines,
    '',
    totalsBlock,
    `Mode: ${mode}`,
    '',
    'My details:',
    customerBlock,
  ].join('\n')
}

export function buildWhatsAppCheckoutUrl(opts: {
  phone?: string // intl, no '+'. Defaults to FOODIEZONE_WA.
  business?: string
  mode?: OrderMode
  lines: CartLine[]
  customer?: CustomerInfo
  deliveryFee?: number
  paymentMethod?: string
}): string {
  const text = buildWhatsAppOrderText({
    business: opts.business ?? 'Foodiezone',
    mode: opts.mode,
    lines: opts.lines,
    customer: opts.customer,
    deliveryFee: opts.deliveryFee,
    paymentMethod: opts.paymentMethod,
  })
  const phone = (opts.phone ?? FOODIEZONE_WA).replace(/[^\d]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
