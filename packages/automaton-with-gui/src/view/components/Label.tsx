import { Colors } from '../constants/Colors';
import { MouseComboBit, mouseCombo } from '../utils/mouseCombo';
import { Resolution } from '../utils/Resolution';
import { TimeRange, t2x } from '../utils/TimeValueRange';
import { arraySetHas } from '../utils/arraySet';
import { registerMouseNoDragEvent } from '../utils/registerMouseNoDragEvent';
import { useDispatch, useSelector } from '../states/store';
import { useDoubleClick } from '../utils/useDoubleClick';
import { useMoveEntites } from '../gui-operation-hooks/useMoveEntities';
import { useRect } from '../utils/useRect';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

// == styles =======================================================================================
const Rect = styled.rect< { selected: boolean } >`
  fill: ${ ( { selected } ) => selected ? Colors.accent : Colors.foresub };
  pointer-events: auto;
  cursor: pointer;
`;

const Line = styled.line< { selected: boolean } >`
  stroke: ${ ( { selected } ) => selected ? Colors.accent : Colors.foresub };
  stroke-width: 1px;
  pointer-events: none;
`;

const Text = styled.text`
  fill: ${ Colors.back1 };
  font-size: 10px;
  pointer-events: none;
`;

// == component ====================================================================================
const Label = ( { name, time, range, size }: {
  name: string;
  time: number;
  range: TimeRange;
  size: Resolution;
} ): JSX.Element => {
  const dispatch = useDispatch();
  const {
    automaton,
    selectedLabels
  } = useSelector( ( state ) => ( {
    automaton: state.automaton.instance,
    guiSettings: state.automaton.guiSettings,
    selectedLabels: state.timeline.selected.labels
  } ) );
  const timeValueRange = useMemo(
    () => ( {
      t0: range.t0,
      v0: 0.0,
      t1: range.t1,
      v1: 1.0,
    } ),
    [ range.t0, range.t1 ]
  );
  const moveEntities = useMoveEntites( timeValueRange, size );
  const checkDoubleClick = useDoubleClick();
  const [ width, setWidth ] = useState( 0.0 );
  const x = t2x( time, range, size.width );
  const refText = useRef<SVGTextElement>( null );
  const rectText = useRect( refText );

  useEffect(
    () => {
      setWidth( rectText.width );
    },
    [ rectText.width ]
  );

  const isSelected = useMemo(
    (): boolean => arraySetHas( selectedLabels, name ),
    [ name, selectedLabels ]
  );

  const grabLabel = useCallback(
    (): void => {
      if ( !isSelected ) {
        dispatch( {
          type: 'Timeline/SelectLabels',
          labels: [ name ],
        } );
      }

      moveEntities( { moveValue: false, snapOriginTime: time } );

      registerMouseNoDragEvent( () => {
        dispatch( {
          type: 'Timeline/SelectLabels',
          labels: [ name ],
        } );
      } );
    },
    [ isSelected, moveEntities, time, dispatch, name ]
  );

  const grabLabelCtrl = useCallback(
    (): void => {
      dispatch( {
        type: 'Timeline/SelectLabelsAdd',
        labels: [ name ],
      } );

      moveEntities( { moveValue: false, snapOriginTime: time } );

      registerMouseNoDragEvent( () => {
        if ( isSelected ) {
          dispatch( {
            type: 'Timeline/SelectLabelsSub',
            labels: [ name ],
          } );
        }
      } );
    },
    [ dispatch, isSelected, moveEntities, name, time ]
  );

  const renameLabel = useCallback(
    ( x: number, y: number ): void => {
      if ( !automaton ) { return; }

      dispatch( {
        type: 'TextPrompt/Open',
        position: { x, y },
        placeholder: 'A new name for the label',
        checkValid: ( newName: string ) => {
          if ( newName === '' ) { return 'Create Label: Name cannot be empty.'; }
          if ( name === newName ) { return null; }
          if ( automaton.labels[ newName ] != null ) { return 'Create Label: A label for the given name already exists.'; }
          return null;
        },
        callback: ( newName ) => {
          if ( name === newName ) { return; }

          automaton.deleteLabel( name );
          automaton.setLabel( newName, time );

          dispatch( {
            type: 'History/Push',
            description: 'Rename Label',
            commands: [
              {
                type: 'automaton/deleteLabel',
                name,
                timePrev: time
              },
              {
                type: 'automaton/createLabel',
                name: newName,
                time
              }
            ],
          } );
        }
      } );

    },
    [ automaton, time, name, dispatch ]
  );

  const deleteLabel = useCallback(
    (): void => {
      if ( !automaton ) { return; }

      automaton.deleteLabel( name );

      dispatch( {
        type: 'History/Push',
        description: 'Delete Label',
        commands: [
          {
            type: 'automaton/deleteLabel',
            name,
            timePrev: time
          }
        ],
      } );
    },
    [ automaton, time, name, dispatch ]
  );

  const handleMouseDown = useCallback(
    ( event ) => mouseCombo( event, {
      [ MouseComboBit.Ctrl + MouseComboBit.LMB ]: () => {
        grabLabelCtrl();
      },
      [ MouseComboBit.LMB ]: () => {
        if ( checkDoubleClick() ) {
          deleteLabel();
        } else {
          grabLabel();
        }
      }
    } ),
    [ checkDoubleClick, deleteLabel, grabLabel, grabLabelCtrl ]
  );

  const handleContextMenu = useCallback(
    ( event: React.MouseEvent ): void => {
      event.preventDefault();

      const x = event.clientX;
      const y = event.clientY;

      dispatch( {
        type: 'ContextMenu/Push',
        position: { x, y },
        commands: [
          {
            name: 'Rename Label',
            description: 'Rename the label.',
            callback: () => renameLabel( x, y )
          },
          {
            name: 'Delete Label',
            description: 'Delete the label.',
            callback: () => deleteLabel()
          }
        ]
      } );
    },
    [ dispatch, renameLabel, deleteLabel ]
  );

  return <g
    transform={ `translate(${ x },${ size.height })` }
    onMouseDown={ handleMouseDown }
    onContextMenu={ handleContextMenu }
  >
    <Line
      y2={ -size.height }
      selected={ ( isSelected ? 1 : 0 ) as any as boolean } // fuck
    />
    <Rect
      width={ width + 4 }
      height="12"
      y="-12"
      selected={ ( isSelected ? 1 : 0 ) as any as boolean } // fuck
    />
    <Text
      ref={ refText }
      x="2"
      y="-2"
    >{ name }</Text>
  </g>;
};

export { Label };
