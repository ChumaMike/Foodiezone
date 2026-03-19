/**
 * Generates public/icons/icon-192.png and icon-512.png
 * Pure Node.js — no external dependencies.
 * Called automatically via "prebuild" script before `next build`.
 */

import { deflateRawSync, createDeflate } from 'node:zlib'
import { createHash } from 'node:crypto'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')

// Foodiezone crimson
const R = 0xcc, G = 0x00, B = 0x00

function crc32(buf) {
  let crc = 0xffffffff
  for (const byte of buf) {
    crc ^= byte
    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length)
  const crcInput = Buffer.concat([typeBuf, data])
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(crcInput))
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

function makePng(size) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)   // width
  ihdr.writeUInt32BE(size, 4)   // height
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // colour type: RGB
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace

  // Raw image data: for each row: filter byte (0 = None) + RGB * width
  const rowSize = 1 + size * 3
  const raw = Buffer.alloc(size * rowSize)
  for (let y = 0; y < size; y++) {
    const offset = y * rowSize
    raw[offset] = 0 // filter byte
    for (let x = 0; x < size; x++) {
      raw[offset + 1 + x * 3] = R
      raw[offset + 1 + x * 3 + 1] = G
      raw[offset + 1 + x * 3 + 2] = B
    }
  }

  const idat = deflateRawSync(raw, { level: 9 })
  const iend = Buffer.alloc(0)

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', iend),
  ])
}

mkdirSync(iconsDir, { recursive: true })
writeFileSync(join(iconsDir, 'icon-192.png'), makePng(192))
writeFileSync(join(iconsDir, 'icon-512.png'), makePng(512))
console.log('✓ PWA icons generated: public/icons/icon-192.png, icon-512.png')
