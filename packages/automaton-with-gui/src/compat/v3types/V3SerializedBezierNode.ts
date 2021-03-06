import type { V3SerializedBezierControlPoint } from './V3SerializedBezierControlPoint';

/**
 * Serialized variant of {@link BezierNode}.
 * Some values are optional.
 */
export interface V3SerializedBezierNode {
  /**
   * Time of the node.
   * `0.0` by default.
   */
  time?: number;

  /**
   * Value of the node.
   * `0.0` by default.
   */
  value?: number;

  /**
   * Bezier control point of inlet.
   * `{ time: 0.0, value: 0.0 }` by default.
   */
  in?: V3SerializedBezierControlPoint;

  /**
   * Bezier control point of outlet.
   * `{ time: 0.0, value: 0.0 }` by default.
   */
  out?: V3SerializedBezierControlPoint;
}
