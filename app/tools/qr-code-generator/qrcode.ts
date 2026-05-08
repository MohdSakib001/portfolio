const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

function initGF(): void {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x < 128 ? x * 2 : (x * 2) ^ 285;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
}

initGF();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[(GF_LOG[a] + GF_LOG[b]) % 255];
}

function gfPolyMul(p: number[], q: number[]): number[] {
  const r = new Array(p.length + q.length - 1).fill(0);
  for (let i = 0; i < p.length; i++)
    for (let j = 0; j < q.length; j++)
      r[i + j] ^= gfMul(p[i], q[j]);
  return r;
}

function rsGeneratorPoly(degree: number): number[] {
  let g = [1];
  for (let i = 0; i < degree; i++) g = gfPolyMul(g, [1, GF_EXP[i]]);
  return g;
}

function rsRemainder(data: number[], generator: number[], eccCount: number): number[] {
  const buf = new Array(eccCount).fill(0);
  for (const byte of data) {
    const factor = byte ^ buf.shift()!;
    buf.push(0);
    if (factor !== 0) {
      for (let i = 0; i < generator.length - 1; i++) {
        buf[i] ^= gfMul(generator[i + 1], factor);
      }
    }
  }
  return buf;
}

const QR_VERSIONS: Array<{
  totalCodewords: number;
  ecBlocks: Array<{ count: number; dataCodewords: number; ecCodewords: number }>;
}> = [
  { totalCodewords: 26,  ecBlocks: [{ count: 1, dataCodewords: 16, ecCodewords: 10 }] },
  { totalCodewords: 44,  ecBlocks: [{ count: 1, dataCodewords: 28, ecCodewords: 16 }] },
  { totalCodewords: 70,  ecBlocks: [{ count: 1, dataCodewords: 44, ecCodewords: 26 }] },
  { totalCodewords: 100, ecBlocks: [{ count: 2, dataCodewords: 32, ecCodewords: 18 }] },
  { totalCodewords: 134, ecBlocks: [{ count: 2, dataCodewords: 43, ecCodewords: 24 }] },
  { totalCodewords: 172, ecBlocks: [{ count: 4, dataCodewords: 27, ecCodewords: 16 }] },
  { totalCodewords: 196, ecBlocks: [{ count: 4, dataCodewords: 31, ecCodewords: 18 }] },
  { totalCodewords: 242, ecBlocks: [{ count: 2, dataCodewords: 38, ecCodewords: 22 }, { count: 2, dataCodewords: 39, ecCodewords: 22 }] },
  { totalCodewords: 292, ecBlocks: [{ count: 3, dataCodewords: 36, ecCodewords: 22 }, { count: 2, dataCodewords: 37, ecCodewords: 22 }] },
  { totalCodewords: 346, ecBlocks: [{ count: 4, dataCodewords: 43, ecCodewords: 26 }, { count: 1, dataCodewords: 44, ecCodewords: 26 }] },
];

const FORMAT_INFOS: number[] = [
  0x5412, 0x5125, 0x5E7C, 0x5B4B, 0x45F9, 0x40CE, 0x4F97, 0x4AA0,
  0x77C4, 0x72F3, 0x7DAA, 0x789D, 0x662F, 0x6318, 0x6C41, 0x6976,
  0x1689, 0x13BE, 0x1CE7, 0x19D0, 0x0762, 0x0255, 0x0D0C, 0x083B,
  0x355F, 0x3068, 0x3F31, 0x3A06, 0x24B4, 0x2183, 0x2EDA, 0x2BED,
];

const ALIGNMENT_POSITIONS: number[][] = [
  [], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
];

function getBits(val: number, len: number): number[] {
  const bits: number[] = [];
  for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  return bits;
}

function chooseVersion(dataLen: number): number {
  for (let v = 0; v < QR_VERSIONS.length; v++) {
    const info = QR_VERSIONS[v];
    const totalData = info.ecBlocks.reduce((s, b) => s + b.count * b.dataCodewords, 0);
    if (totalData >= dataLen + 3) return v;
  }
  return QR_VERSIONS.length - 1;
}

function encodeData(text: string, version: number): number[] {
  const bytes = Array.from(new TextEncoder().encode(text));
  const versionInfo = QR_VERSIONS[version];
  const totalData = versionInfo.ecBlocks.reduce((s, b) => s + b.count * b.dataCodewords, 0);

  const bits: number[] = [];
  bits.push(...getBits(0b0100, 4));
  bits.push(...getBits(bytes.length, version < 9 ? 8 : 16));
  for (const b of bytes) bits.push(...getBits(b, 8));

  bits.push(...getBits(0, 4));
  while (bits.length % 8 !== 0) bits.push(0);

  const pads = [0xEC, 0x11];
  let pi = 0;
  while (bits.length < totalData * 8) {
    bits.push(...getBits(pads[pi % 2], 8));
    pi++;
  }

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i + j] ?? 0);
    codewords.push(b);
  }
  return codewords;
}

function interleaveBlocks(dataCodewords: number[], version: number): number[] {
  const versionInfo = QR_VERSIONS[version];
  const blocks: number[][] = [];
  const ecBlocks: number[][] = [];

  let pos = 0;
  for (const { count, dataCodewords: dc, ecCodewords: ec } of versionInfo.ecBlocks) {
    const gen = rsGeneratorPoly(ec);
    for (let i = 0; i < count; i++) {
      const block = dataCodewords.slice(pos, pos + dc);
      pos += dc;
      blocks.push(block);
      const ecBlock = rsRemainder(block, gen, ec);
      ecBlocks.push(ecBlock);
    }
  }

  const result: number[] = [];
  const maxDc = Math.max(...blocks.map(b => b.length));
  for (let i = 0; i < maxDc; i++)
    for (const block of blocks) if (i < block.length) result.push(block[i]);

  const maxEc = Math.max(...ecBlocks.map(b => b.length));
  for (let i = 0; i < maxEc; i++)
    for (const block of ecBlocks) if (i < block.length) result.push(block[i]);

  return result;
}

function makeMatrix(size: number): number[][] {
  return Array.from({ length: size }, () => new Array(size).fill(-1));
}

function setFinderPattern(matrix: number[][], r: number, c: number): void {
  for (let dr = -1; dr <= 7; dr++) {
    for (let dc = -1; dc <= 7; dc++) {
      const row = r + dr, col = c + dc;
      if (row < 0 || row >= matrix.length || col < 0 || col >= matrix.length) continue;
      if (dr === -1 || dr === 7 || dc === -1 || dc === 7) {
        matrix[row][col] = 0;
      } else {
        const onOuterRing = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inInnerWhite = dr >= 1 && dr <= 5 && dc >= 1 && dc <= 5 && !(dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
        matrix[row][col] = onOuterRing ? 1 : inInnerWhite ? 0 : 1;
      }
    }
  }
}

function setAlignmentPattern(matrix: number[][], r: number, c: number): void {
  for (let dr = -2; dr <= 2; dr++) {
    for (let dc = -2; dc <= 2; dc++) {
      const onEdge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
      const isCenter = dr === 0 && dc === 0;
      matrix[r + dr][c + dc] = onEdge || isCenter ? 1 : 0;
    }
  }
}

function placeFinderAndSeparators(matrix: number[][], size: number): void {
  setFinderPattern(matrix, 0, 0);
  setFinderPattern(matrix, 0, size - 7);
  setFinderPattern(matrix, size - 7, 0);
}

function placeTimingPatterns(matrix: number[][], size: number): void {
  for (let i = 8; i < size - 8; i++) {
    const v = i % 2 === 0 ? 1 : 0;
    if (matrix[6][i] === -1) matrix[6][i] = v;
    if (matrix[i][6] === -1) matrix[i][6] = v;
  }
}

function placeAlignmentPatterns(matrix: number[][], version: number): void {
  const positions = ALIGNMENT_POSITIONS[version] ?? [];
  for (const r of positions) {
    for (const c of positions) {
      if (matrix[r][c] !== -1) continue;
      setAlignmentPattern(matrix, r, c);
    }
  }
}

function reserveFormatModules(matrix: number[][], size: number): void {
  for (let i = 0; i <= 8; i++) {
    if (matrix[8][i] === -1) matrix[8][i] = 0;
    if (matrix[i][8] === -1) matrix[i][8] = 0;
    if (i < 8 && matrix[8][size - 1 - i] === -1) matrix[8][size - 1 - i] = 0;
    if (i < 8 && matrix[size - 1 - i][8] === -1) matrix[size - 1 - i][8] = 0;
  }
  matrix[size - 8][8] = 1;
}

function placeFormatInfo(matrix: number[][], size: number, formatBits: number): void {
  const bits: number[] = [];
  for (let i = 14; i >= 0; i--) bits.push((formatBits >> i) & 1);

  let idx = 0;
  for (let i = 0; i <= 5; i++) matrix[8][i] = bits[idx++];
  matrix[8][7] = bits[idx++];
  matrix[8][8] = bits[idx++];
  matrix[7][8] = bits[idx++];
  for (let i = 5; i >= 0; i--) matrix[i][8] = bits[idx++];

  idx = 0;
  for (let i = size - 1; i >= size - 8; i--) matrix[8][i] = bits[idx++];
  for (let i = size - 7; i < size; i++) matrix[i][8] = bits[idx++];
}

function placeDataBits(matrix: number[][], size: number, codewords: number[]): void {
  const bits: number[] = [];
  for (const cw of codewords) {
    for (let i = 7; i >= 0; i--) bits.push((cw >> i) & 1);
  }

  let bitIdx = 0;
  let up = true;
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5;
    for (let row = 0; row < size; row++) {
      const r = up ? size - 1 - row : row;
      for (let dc = 0; dc < 2; dc++) {
        const c = col - dc;
        if (matrix[r][c] === -1) {
          matrix[r][c] = bitIdx < bits.length ? bits[bitIdx++] : 0;
        }
      }
    }
    up = !up;
  }
}

function buildFunctionMask(size: number, version: number): boolean[][] {
  const fn = Array.from({ length: size }, () => new Array(size).fill(false));
  const mark = (r: number, c: number) => {
    if (r >= 0 && r < size && c >= 0 && c < size) fn[r][c] = true;
  };
  for (let dr = -1; dr <= 7; dr++) {
    for (let dc = -1; dc <= 7; dc++) {
      mark(dr, dc);
      mark(dr, size - 7 + dc - 1);
      mark(size - 7 + dr - 1, dc);
    }
  }
  for (let i = 8; i < size - 8; i++) { mark(6, i); mark(i, 6); }
  for (let i = 0; i <= 8; i++) { mark(8, i); mark(i, 8); mark(8, size - 1 - i); mark(size - 1 - i, 8); }

  const positions = ALIGNMENT_POSITIONS[version] ?? [];
  for (const ar of positions)
    for (const ac of positions)
      for (let dr = -2; dr <= 2; dr++)
        for (let dc = -2; dc <= 2; dc++)
          mark(ar + dr, ac + dc);

  return fn;
}

function applyMask(matrix: number[][], size: number, mask: number, fnMask: boolean[][]): number[][] {
  const m = matrix.map(row => [...row]);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (fnMask[r][c]) continue;
      let apply = false;
      switch (mask) {
        case 0: apply = (r + c) % 2 === 0; break;
        case 1: apply = r % 2 === 0; break;
        case 2: apply = c % 3 === 0; break;
        case 3: apply = (r + c) % 3 === 0; break;
        case 4: apply = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
        case 5: apply = (r * c) % 2 + (r * c) % 3 === 0; break;
        case 6: apply = ((r * c) % 2 + (r * c) % 3) % 2 === 0; break;
        case 7: apply = ((r + c) % 2 + (r * c) % 3) % 2 === 0; break;
      }
      if (apply) m[r][c] ^= 1;
    }
  }
  return m;
}

function evalPenalty(matrix: number[][], size: number): number {
  let penalty = 0;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size - 4; c++) {
      const v = matrix[r][c];
      if (matrix[r][c+1] === v && matrix[r][c+2] === v && matrix[r][c+3] === v && matrix[r][c+4] === v) penalty += 3;
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r < size - 4; r++) {
      const v = matrix[r][c];
      if (matrix[r+1][c] === v && matrix[r+2][c] === v && matrix[r+3][c] === v && matrix[r+4][c] === v) penalty += 3;
    }
  }

  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c];
      if (matrix[r][c+1] === v && matrix[r+1][c] === v && matrix[r+1][c+1] === v) penalty += 3;
    }
  }

  let dark = 0;
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (matrix[r][c] === 1) dark++;

  const pct = (dark / (size * size)) * 100;
  const prev5 = Math.floor(pct / 5) * 5;
  const next5 = prev5 + 5;
  penalty += Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10;

  return penalty;
}

export function encodeText(text: string, ecl: number): boolean[][] {
  const version = chooseVersion(new TextEncoder().encode(text).length);
  const size = version * 4 + 21;

  const dataCodewords = encodeData(text, version);
  const allCodewords = interleaveBlocks(dataCodewords, version);

  const base = makeMatrix(size);
  placeFinderAndSeparators(base, size);
  placeTimingPatterns(base, size);
  placeAlignmentPatterns(base, version);
  reserveFormatModules(base, size);
  placeDataBits(base, size, allCodewords);

  const fnMask = buildFunctionMask(size, version);

  let bestMask = 0;
  let bestPenalty = Infinity;
  let bestMatrix: number[][] = base;

  for (let mask = 0; mask < 8; mask++) {
    const formatIdx = (ecl << 3) | mask;
    const fmt = FORMAT_INFOS[formatIdx];
    const trial = applyMask(base, size, mask, fnMask);
    placeFormatInfo(trial, size, fmt);
    const p = evalPenalty(trial, size);
    if (p < bestPenalty) {
      bestPenalty = p;
      bestMask = mask;
      bestMatrix = trial;
    }
  }

  const formatIdx = (ecl << 3) | bestMask;
  placeFormatInfo(bestMatrix, size, FORMAT_INFOS[formatIdx]);

  return bestMatrix.map(row => row.map(v => v === 1));
}
