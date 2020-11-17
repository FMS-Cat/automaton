import { BoolParam } from './BoolParam';
import { CURVE_FX_ROW_MAX } from '../../CurveWithGUI';
import { InspectorHeader } from './InspectorHeader';
import { InspectorHr } from './InspectorHr';
import { InspectorItem } from './InspectorItem';
import { NumberParam } from './NumberParam';
import { clamp } from '../../utils/clamp';
import { useDispatch, useSelector } from '../states/store';
import { useTimeUnit } from '../utils/useTimeUnit';
import React from 'react';

// == component ====================================================================================
export interface InspectorCurveFxProps {
  curveId: string;
  fx: string;
}

const InspectorCurveFx = ( props: InspectorCurveFxProps ): JSX.Element | null => {
  const dispatch = useDispatch();
  const { automaton, curves, useBeatInGUI } = useSelector( ( state ) => ( {
    automaton: state.automaton.instance,
    curves: state.automaton.curves,
    useBeatInGUI: state.automaton.guiSettings.useBeatInGUI,
  } ) );
  const curve = automaton?.getCurveById( props.curveId ) || null;
  const fx = curves[ props.curveId ].fxs[ props.fx ];
  const fxDefParams = automaton?.getFxDefinitionParams( fx.def );
  const { displayToTime, timeToDisplay } = useTimeUnit();

  return ( automaton && curve && <>
    <InspectorHeader text={ `Fx: ${ automaton.getFxDefinitionName( fx.def ) }` } />

    <InspectorHr />

    <InspectorItem name={ useBeatInGUI ? 'Beat' : 'Time' }>
      <NumberParam
        type="float"
        value={ timeToDisplay( fx.time ) }
        onChange={ ( value ) => { curve.moveFx( fx.$id, displayToTime( value ) ); } }
        onSettle={ ( value, valuePrev ) => {
          dispatch( {
            type: 'History/Push',
            description: 'Change Fx Length',
            commands: [
              {
                type: 'curve/moveFx',
                curveId: props.curveId,
                fx: fx.$id,
                time: displayToTime( value ),
                timePrev: displayToTime( valuePrev ),
              }
            ]
          } );
        } }
      />
    </InspectorItem>
    <InspectorItem name="Length">
      <NumberParam
        type="float"
        value={ timeToDisplay( fx.length ) }
        onChange={ ( value ) => { curve.resizeFx( fx.$id, displayToTime( value ) ); } }
        onSettle={ ( value, valuePrev ) => {
          dispatch( {
            type: 'History/Push',
            description: 'Change Fx Length',
            commands: [
              {
                type: 'curve/resizeFx',
                curveId: props.curveId,
                fx: fx.$id,
                length: displayToTime( value ),
                lengthPrev: displayToTime( valuePrev ),
              }
            ]
          } );
        } }
      />
    </InspectorItem>
    <InspectorItem name="Row">
      <NumberParam
        type="int"
        value={ fx.row }
        onChange={ ( row ) => {
          curve.changeFxRow(
            fx.$id,
            clamp( row, 0.0, CURVE_FX_ROW_MAX - 1 )
          );
        } }
        onSettle={ ( row, rowPrev ) => {
          dispatch( {
            type: 'History/Push',
            description: 'Change Fx Row',
            commands: [
              {
                type: 'curve/changeFxRow',
                curveId: props.curveId,
                fx: fx.$id,
                row: clamp( row, 0, CURVE_FX_ROW_MAX - 1 ),
                rowPrev
              }
            ]
          } );
        } }
      />
    </InspectorItem>
    <InspectorItem name="Bypass">
      <BoolParam
        value={ !!fx.bypass }
        onChange={ ( value ) => {
          curve.bypassFx( fx.$id, value );
        } }
        onSettle={ ( value ) => {
          dispatch( {
            type: 'History/Push',
            description: 'Toggle Fx Bypass',
            commands: [
              {
                type: 'curve/bypassFx',
                curveId: props.curveId,
                fx: fx.$id,
                bypass: value
              }
            ]
          } );
        } }
      />
    </InspectorItem>

    <InspectorHr />

    { fxDefParams && Object.entries( fxDefParams ).map( ( [ name, fxParam ] ) => (
      <InspectorItem name={ fxParam.name || name } key={ name }>
        <>
          { ( fxParam.type === 'float' || fxParam.type === 'int' ) && (
            <NumberParam
              type={ fxParam.type }
              value={ fx.params[ name ] }
              onChange={ ( value ) => {
                curve.changeFxParam( fx.$id, name, value );
              } }
              onSettle={ ( value, valuePrev ) => {
                dispatch( {
                  type: 'History/Push',
                  description: 'Change Fx Param',
                  commands: [
                    {
                      type: 'curve/changeFxParam',
                      curveId: props.curveId,
                      fx: fx.$id,
                      key: name,
                      value,
                      valuePrev
                    }
                  ]
                } );
              } }
            />
          ) }
          { ( fxParam.type === 'boolean' ) && (
            <BoolParam
              value={ fx.params[ name ] }
              onChange={ ( value ) => {
                curve.changeFxParam( fx.$id, name, value );
              } }
              onSettle={ ( value, valuePrev ) => {
                dispatch( {
                  type: 'History/Push',
                  description: 'Change Fx Param',
                  commands: [
                    {
                      type: 'curve/changeFxParam',
                      curveId: props.curveId,
                      fx: fx.$id,
                      key: name,
                      value,
                      valuePrev
                    }
                  ]
                } );
              } }
            />
          ) }
        </>
      </InspectorItem>
    ) ) }
  </> ) ?? null;
};

export { InspectorCurveFx };
