// @webtoon/psd
// Copyright 2021-present NAVER WEBTOON
// MIT License

// NOTE (arena adaptation): the original implementation depends on a WASM
// channel decoder package that is part of the upstream monorepo and is not
// published independently. For the purposes of this exercise the decoder is
// stubbed out — `generateRgba` / `decodeRgb` / `decodeGrayscale` are
// preserved as exported symbols so the rest of the codebase type-checks, but
// they throw at call time. The bug under investigation lives in the parsing
// pipeline (`PSD.parse(buffer)`), upstream of pixel decoding, so this
// adaptation does not affect reproducibility.
const wasmDecoder = {
  init: Promise.resolve(),
  decode_rgb: (..._args: unknown[]): Uint8Array => {
    throw new Error("WASM decoder is stubbed out in the arena build.");
  },
  decode_rgba: (..._args: unknown[]): Uint8Array => {
    throw new Error("WASM decoder is stubbed out in the arena build.");
  },
  decode_grayscale: (..._args: unknown[]): Uint8Array => {
    throw new Error("WASM decoder is stubbed out in the arena build.");
  },
  decode_grayscale_a: (..._args: unknown[]): Uint8Array => {
    throw new Error("WASM decoder is stubbed out in the arena build.");
  },
};
import {ChannelBytes, ChannelCompression} from "../interfaces";
import {UnsupportedCompression} from "../utils";

/**
 * Decodes one or more encoded channels and combines them into an image.
 * @param width Width of the decoded image in pixels
 * @param height Height of the decoded image in pixels
 * @param red Encoded red channel data
 * @param green Encoded green channel data
 * @param blue Encoded blue channel data
 * @param alpha Encoded alpha channel data
 * @returns `Uint8ClampedArray` containing the pixel data of the decoded image.
 *    Each pixel takes up 4 bytes--1 byte for red, blue, green, and alpha.
 */
export async function generateRgba(
  width: number,
  height: number,
  red: ChannelBytes,
  green?: ChannelBytes,
  blue?: ChannelBytes,
  alpha?: ChannelBytes
): Promise<Uint8ClampedArray> {
  const pixelCount = width * height;

  if (!(pixelCount > 0 && Number.isInteger(pixelCount))) {
    throw new Error(
      `Pixel count must be a positive integer, got ${pixelCount}`
    );
  }

  let result: Uint8Array;
  if (green && blue) {
    result = await decodeRgb(pixelCount, red, green, blue, alpha);
  } else if (!blue && !green) {
    result = await decodeGrayscale(pixelCount, red, alpha);
  } else {
    throw new Error(`Missing ${blue ? "green" : "blue"} channel in RGB image`);
  }

  return new Uint8ClampedArray(
    result.buffer,
    result.byteOffset,
    result.byteLength
  );
}

function validateSupportedCompression(
  compression: ChannelCompression
): asserts compression is
  | ChannelCompression.RawData
  | ChannelCompression.RleCompressed {
  switch (compression) {
    case ChannelCompression.RawData:
    case ChannelCompression.RleCompressed:
      return;
  }
  throw new UnsupportedCompression(
    `Unsupported compression method: ${compression}`
  );
}

export async function decodeRgb(
  pixels: number,
  red: ChannelBytes,
  green: ChannelBytes,
  blue: ChannelBytes,
  alpha?: ChannelBytes
) {
  await wasmDecoder.init;

  validateSupportedCompression(red.compression);
  validateSupportedCompression(blue.compression);
  validateSupportedCompression(red.compression);
  if (alpha) {
    validateSupportedCompression(alpha.compression);
  }

  return alpha
    ? wasmDecoder.decode_rgba(
        pixels,
        red.data,
        red.compression,
        green.data,
        green.compression,
        blue.data,
        blue.compression,
        alpha.data,
        alpha.compression
      )
    : wasmDecoder.decode_rgb(
        pixels,
        red.data,
        red.compression,
        green.data,
        green.compression,
        blue.data,
        blue.compression
      );
}

export async function decodeGrayscale(
  pixels: number,
  color: ChannelBytes,
  alpha?: ChannelBytes
) {
  await wasmDecoder.init;

  validateSupportedCompression(color.compression);
  if (alpha) {
    validateSupportedCompression(alpha.compression);
  }

  return alpha
    ? wasmDecoder.decode_grayscale_a(
        pixels,
        color.data,
        color.compression,
        alpha.data,
        alpha.compression
      )
    : wasmDecoder.decode_grayscale(pixels, color.data, color.compression);
}
