import React, { useContext, useEffect, useRef, useState } from 'react';
import { Colors } from '../constants/Colors';
import { Contexts } from '../contexts/Context';
import { registerMouseEvent } from '../utils/registerMouseEvent';
import styled from 'styled-components';
import { useDoubleClick } from '../utils/useDoubleClick';

// == styles =======================================================================================
const Input = styled.input`
  display: block;
  width: calc( 100% - 0.2rem );
  height: calc( 100% - 0.2rem );
  font-size: 0.8rem;
  padding: 0.1rem;
  border: none;
  text-align: center;
  background: ${ Colors.foresub };
  color: ${ Colors.back1 };
  pointer-events: auto;
`;

const Value = styled.div`
  width: calc( 100% - 0.2rem );
  height: calc( 100% - 0.2rem );
  margin: 0.1rem;
  font-size: 0.8rem;
  line-height: 1em;
  color: ${ Colors.fore };
  cursor: pointer;
  pointer-events: auto;
`;

const Root = styled.div`
  overflow: hidden;
  width: 4rem;
  height: 1rem;
  text-align: center;
  background: ${ Colors.back3 };
`;

// == functions ====================================================================================
type ValueType = 'int' | 'float';

function inputToValue( value: string, type: ValueType ): number | null {
  if ( type === 'int' ) {
    const result = parseInt( value );
    if ( Number.isNaN( result ) ) { return null; }
    return result;
  } else {
    const result = parseFloat( value );
    if ( Number.isNaN( result ) ) { return null; }
    return result;
  }
}

function valueToInput( value: number, type: ValueType ): string {
  if ( type === 'int' ) {
    return Math.floor( value as number ).toString();
  } else {
    return ( value as number ).toFixed( 3 );
  }
}

// == element ======================================================================================
export interface ParamBoxProps {
  type: ValueType;
  value: number;
  historyDescription: string;
  className?: string;
  onChange?: ( value: number ) => void;
  onPressTab?: () => void;
}

export const ParamBox = ( props: ParamBoxProps ): JSX.Element => {
  const contexts = useContext( Contexts.Store );
  const { className, type, value, historyDescription, onChange, onPressTab } = props;
  const [ isInput, setIsInput ] = useState<boolean>( false );
  const refInput = useRef<HTMLInputElement>( null );
  const [ inputValue, setInputValue ] = useState<string>( '' );
  const checkDoubleClick = useDoubleClick();

  useEffect( () => { // focus on the input
    if ( isInput ) {
      refInput.current!.focus();
    }
  }, [ isInput ] );

  const pushHistoryAndDo = ( v: number, vPrev: number ): void => {
    const undo = (): void => {
      onChange && onChange( vPrev );
    };

    const redo = (): void => {
      onChange && onChange( v );
    };

    contexts.dispatch( {
      type: 'History/Push',
      entry: {
        description: historyDescription,
        redo,
        undo
      }
    } );
    redo();
  };

  const handleClick = ( event: React.MouseEvent ): void => {
    event.preventDefault();
    event.stopPropagation();

    if ( event.buttons === 1 ) {
      if ( checkDoubleClick() ) {
        setIsInput( true );
        setInputValue( String( value ) );
      } else {
        if ( props.type === 'int' ) {
          const vPrev = value;
          let v = vPrev as number;
          let hasMoved = false;

          registerMouseEvent(
            ( event, movementSum ) => {
              hasMoved = true;

              const exp = event.shiftKey;
              // const exp = event.ctrlKey || event.metaKey;
              const fine = event.altKey;

              if ( exp ) {
                const dyAbs = Math.abs( -movementSum.y );
                const dySign = Math.sign( -movementSum.y );
                for ( let i = 0; i < dyAbs; i ++ ) {
                  const vAbs = Math.abs( v );
                  const vSign = Math.sign( v + 1E-4 * dySign );
                  const order = Math.floor(
                    Math.log10( vAbs + 1E-4 * dySign * vSign )
                  ) - 1 - ( fine ? 1 : 0 );
                  v += Math.max( 0.1, Math.pow( 10.0, order ) ) * dySign;
                }
              } else {
                v += ( fine ? 0.1 : 1.0 ) * -movementSum.y;
              }

              onChange && onChange( Math.round( v ) );
            },
            () => {
              if ( !hasMoved ) { return; }

              pushHistoryAndDo( v, vPrev );
            }
          );
        } else {
          const vPrev = value;
          let v = vPrev as number;
          let hasMoved = false;

          registerMouseEvent(
            ( event, movementSum ) => {
              hasMoved = true;

              const exp = event.shiftKey;
              // const exp = event.ctrlKey || event.metaKey;
              const fine = event.altKey;

              if ( exp ) {
                const dyAbs = Math.abs( -movementSum.y );
                const dySign = Math.sign( -movementSum.y );
                for ( let i = 0; i < dyAbs; i ++ ) {
                  const vAbs = Math.abs( v );
                  const vSign = Math.sign( v + 1E-4 * dySign );
                  const order = Math.floor(
                    Math.log10( vAbs + 1E-4 * dySign * vSign )
                  ) - 1 - ( fine ? 1 : 0 );
                  v += Math.max( 0.001, Math.pow( 10.0, order ) ) * dySign;
                }
              } else {
                v += ( fine ? 0.001 : 0.01 ) * -movementSum.y;
              }

              onChange && onChange( v );
            },
            () => {
              if ( !hasMoved ) { return; }

              pushHistoryAndDo( v, vPrev );
            }
          );
        }
      }
    }
  };

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ): void => {
    setInputValue( event.target.value );
  };

  const handleKeyDown = ( event: React.KeyboardEvent<HTMLInputElement> ): void => {
    if ( event.nativeEvent.key === 'Enter' ) {
      event.preventDefault();

      const vPrev = value;
      const v = inputToValue( inputValue, type );
      if ( v != null ) {
        pushHistoryAndDo( v, vPrev );
      }

      setIsInput( false );
    } else if ( event.nativeEvent.key === 'Escape' ) {
      event.preventDefault();

      setIsInput( false );
    } else if ( event.nativeEvent.key === 'Tab' ) {
      event.preventDefault();

      const vPrev = value;
      const v = inputToValue( inputValue, type );
      if ( v != null ) {
        pushHistoryAndDo( v, vPrev );
      }

      setIsInput( false );
    }
  };

  const displayValue = valueToInput( value, type );

  return (
    <Root className={ className }>
      {
        isInput ? (
          <Input
            ref={ refInput }
            value={ inputValue }
            onChange={ handleChange }
            onKeyDown={ handleKeyDown }
          />
        ) : (
          <Value
            onMouseDown={ handleClick }
          >{ displayValue }</Value>
        )
      }
    </Root>
  );
};
