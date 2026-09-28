export type RenderCallback = (
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  radius: number,
  deltaTime: number,
) => void;

/**
 * "ease-in-out" cubic bezier function
 * @param x Float between 0 and 1
 * @returns Float between 0 and 1
 */
export function easeInOutQuad(x: number) {
  if (x < 0.5) return 2 * x * x;

  const value = 2 - x * 2;

  return 1 - (value * value) / 2;
}
