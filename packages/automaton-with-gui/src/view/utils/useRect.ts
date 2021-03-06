// Ref: https://codesandbox.io/s/userect-hook-1y5t7

import { useCallback, useLayoutEffect, useState } from 'react';
import { useElement } from './useElement';
import ResizeObserver from 'resize-observer-polyfill';

export interface RectResult {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

const nullResult: RectResult = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0
};

function getRect<T extends HTMLElement | SVGElement>( element?: T ): RectResult {
  if ( element ) {
    return element.getBoundingClientRect();
  } else {
    return nullResult;
  }
}

export function useRect<T extends HTMLElement | SVGElement>(
  ref: React.RefObject<T>
): RectResult {
  const element = useElement( ref );
  const [ rect, setRect ] = useState<RectResult>( nullResult );

  const handleResize = useCallback(
    () => {
      if ( !element ) { return; }
      setRect( getRect( element ) ); // Update client rect
    },
    [ element ]
  );

  useLayoutEffect(
    () => {
      if ( !element ) { return; }

      handleResize();

      const resizeObserver = new ResizeObserver( handleResize );
      resizeObserver.observe( element );

      window.addEventListener( 'resize', handleResize );

      return () => {
        if ( !resizeObserver ) { return; }
        resizeObserver.disconnect();
        window.removeEventListener( 'resize', handleResize );
      };
    },
    [ element, handleResize ]
  );

  return rect;
}
