export interface FxContext {

  /**
   * Index value of the current sample.
   */
  index: number;

  /**
   * Index value of the first sample of the fx section.
   */
  i0: number;

  /**
   * Index value of the last sample of the fx section.
   */
  i1: number;

  /**
   * Time of the current point.
   */
  time: number;

  /**
   * Time of the beginning point of the fx section.
   */
  t0: number;

  /**
   * Time of the ending point of the fx section.
   */
  t1: number;

  /**
   * DeltaTime between current sample and previous sample.
   */
  deltaTime: number;

  /**
   * Current elapsed time since the fx started.
   */
  elapsed: number;

  /**
   * Progress of current position of the fx section, in [0-1].
   */
  progress: number;

  /**
   * Resolution of the automaton.
   */
  resolution: number;

  /**
   * Length of the fx section.
   */
  length: number;

  /**
   * Params of the fx section.
   */
  params: { [ key: string ]: any };

  /**
   * Array of the input samples.
   */
  array: Float32Array;

  /**
   * The "shouldNotInterpolate" flag.
   *
   * **The API is still under consideration, please use at your own risk.**
   */
  shouldNotInterpolate: boolean;

  /**
   * Set the "shouldNotInterpolate" flag in the current sample.
   *
   * **The API is still under consideration, please use at your own risk.**
   */
  setShouldNotInterpolate: ( shouldNotInterpolate: boolean ) => void;

  /**
   * {@link Channel#getValue} of the current channel.
   */
  getValue: ( time: number ) => number;

  /**
   * Whether the sample is initial point of the fx section or not.
   */
  init: boolean;

  /**
   * Current input value.
   */
  value: number;

  /**
   * You can store anything in the field.
   */
  state: { [ key: string]: any };
}
