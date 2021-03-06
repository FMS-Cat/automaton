import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { StatusIcon } from './StatusIcon';
import { duplicateName } from '../utils/duplicateName';
import { registerMouseEvent } from '../utils/registerMouseEvent';
import { showToasty } from '../states/Toasty';
import { useDispatch, useSelector } from '../states/store';
import { useRect } from '../utils/useRect';
import { writeClipboard } from '../utils/clipboard';
import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';

// == microcomponent ===============================================================================
const Value = ( { className, name }: {
  className?: string;
  name: string;
} ): JSX.Element => {
  const { value } = useSelector( ( state ) => ( {
    value: state.automaton.channels[ name ].value
  } ) );

  return (
    <div className={ className }>{ value.toFixed( 3 ) }</div>
  );
};

// == styles =======================================================================================
const NameBig = styled.span`
  font-size: 14px;
`;

const NameSmall = styled.span`
  font-size: 9px;
`;

const Name = styled.div`
  position: absolute;
  left: 2px;
  bottom: 2px;
  line-height: 1.0;
  transform-origin: bottom left;
  white-space: nowrap;
`;

const StyledValue = styled( Value )`
  position: absolute;
  right: 2px;
  bottom: 2px;
  font-size: 9px;
  line-height: 1.0;
  opacity: 0.7;
`;

const Root = styled.div<{ isSelected: boolean }>`
  position: relative;
  height: ${ Metrics.channelListEntyHeight - 2 }px;
  background: ${ ( { isSelected } ) => ( isSelected ? Colors.back4 : Colors.back3 ) };
  box-shadow: ${ ( { isSelected } ) => ( isSelected ? `0 0 0 1px ${ Colors.accent }` : 'none' ) };
`;

// == component ====================================================================================
export interface ChannelListEntryProps {
  className?: string;
  name: string;
  refScrollTop: React.RefObject<number>;
}

const ChannelListEntry = ( props: ChannelListEntryProps ): JSX.Element => {
  const { className, name, refScrollTop } = props;
  const dispatch = useDispatch();
  const { automaton, isSelected, status } = useSelector( ( state ) => ( {
    automaton: state.automaton.instance,
    isSelected: state.timeline.selectedChannel === name,
    status: state.automaton.channels[ name ].status
  } ) );

  const [ nameSmall, nameBig ] = useMemo(
    () => {
      const tree = name.split( '/' );
      const sep = ( tree[ tree.length - 1 ].length === 1 )
        ? ( tree.length - 2 )
        : ( tree.length - 1 );
      const treeBig = tree.splice( sep );
      let nameSmall = tree.join( '/' );
      nameSmall = nameSmall.length === 0 ? '' : nameSmall + '/';
      return [
        nameSmall,
        treeBig.join( '/' )
      ];
    },
    [ name ]
  );


  const refRoot = useRef<HTMLDivElement>( null );
  const rectRoot = useRect( refRoot );
  const refText = useRef<HTMLDivElement>( null );
  const rectText = useRect( refText );

  const scale = useMemo(
    () => {
      if ( rectRoot.width !== 0 && rectText.width !== 0 ) {
        return Math.min( 1.0, ( rectRoot.width - 32 ) / rectText.width );
      } else {
        return 1.0;
      }
    },
    [ rectRoot, rectText ]
  );

  const handleMouseDown = useCallback(
    ( event ) => {
      if ( !automaton ) { return; }

      const initY = event.clientY - ( refScrollTop.current ?? 0.0 );
      const reorder = automaton.reorderChannels( name, true );
      let deltaIndex = 0;

      registerMouseEvent(
        ( event ) => {
          const currentY = event.clientY - ( refScrollTop.current ?? 0.0 );
          deltaIndex = Math.round( ( currentY - initY ) / Metrics.channelListEntyHeight );
          reorder( deltaIndex );
        },
        () => {
          if ( deltaIndex === 0 ) { return; }

          dispatch( {
            type: 'History/Push',
            description: `Reorder Channels: ${ name }`,
            commands: [
              {
                type: 'automaton/reorderChannels',
                name,
                deltaIndex,
              }
            ]
          } );
        }
      );
    },
    [ automaton, dispatch, name, refScrollTop ]
  );

  const handleClick = useCallback(
    () => {
      dispatch( {
        type: 'Timeline/SelectChannel',
        channel: isSelected ? null : name
      } );

      dispatch( {
        type: 'Timeline/UnselectItemsOfOtherChannels'
      } );
    },
    [ dispatch, isSelected, name ]
  );

  const editChannel = useCallback(
    (): void => {
      dispatch( {
        type: 'Timeline/SelectChannel',
        channel: name
      } );

      dispatch( {
        type: 'Workspace/ChangeMode',
        mode: 'channel'
      } );
    },
    [ dispatch, name ]
  );

  const renameChannel = useCallback(
    ( x: number, y: number ) => {
      if ( !automaton ) { return; }

      dispatch( {
        type: 'TextPrompt/Open',
        position: { x, y },
        defaultText: name,
        placeholder: 'New name for the channel',
        checkValid: ( newName ) => {
          if ( newName === '' ) { return 'Rename Channel: Name cannot be empty.'; }
          if ( newName === name ) { return null; }
          if ( automaton.getChannel( newName ) != null ) { return 'Rename Channel: A channel for the given name already exists.'; }
          return null;
        },
        callback: ( newName ) => {
          if ( newName === name ) { return; }

          const data = automaton.getChannel( name )!.serialize();

          const index = automaton.getChannelIndex( name );
          automaton.removeChannel( name );
          automaton.createChannel( newName, data, index );

          dispatch( {
            type: 'History/Push',
            description: `Rename Channel: ${ name } -> ${ newName }`,
            commands: [
              {
                type: 'automaton/renameChannel',
                name,
                newName,
                data,
                index,
              }
            ]
          } );
        }
      } );
    },
    [ automaton, name, dispatch ]
  );

  const duplicateChannel = useCallback(
    () => {
      if ( !automaton ) { return; }

      const dupName = duplicateName( name, new Set( Object.keys( automaton.mapNameToChannel ) ) );
      const data = automaton.getChannel( name )!.serialize();

      const index = automaton.getChannelIndex( name ) + 1;
      automaton.createChannel( dupName, data, index );

      dispatch( {
        type: 'History/Push',
        description: `Duplicate Channel: ${ dupName }`,
        commands: [
          {
            type: 'automaton/createChannel',
            channel: dupName,
            data,
            index,
          },
        ]
      } );
    },
    [ automaton, name, dispatch ]
  );

  const removeChannel = useCallback(
    () => {
      if ( !automaton ) { return; }

      const data = automaton.getChannel( name )!.serialize();

      const index = automaton.getChannelIndex( name );
      automaton.removeChannel( name );

      dispatch( {
        type: 'History/Push',
        description: `Remove Channel: ${ name }`,
        commands: [
          {
            type: 'automaton/removeChannel',
            channel: name,
            data,
            index,
          }
        ]
      } );
    },
    [ automaton, name, dispatch ]
  );

  const copyName = useCallback(
    (): void => {
      writeClipboard( name );

      showToasty( {
        dispatch,
        kind: 'info',
        message: 'Copied to clipboard!',
        timeout: 2.0
      } );
    },
    [ name, dispatch ]
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
            name: 'Edit Channel',
            description: 'Edit the channel.',
            callback: () => editChannel()
          },
          {
            name: 'Rename Channel',
            description: 'Rename the channel.',
            callback: () => renameChannel( x, y )
          },
          {
            name: 'Duplicate Channel',
            description: 'Duplicate the channel.',
            callback: () => duplicateChannel()
          },
          {
            name: 'Remove Channel',
            description: 'Remove the channel.',
            callback: () => removeChannel()
          },
          {
            name: 'Copy Channel Name',
            description: 'Copy the name of the channel to clipboard.',
            callback: () => copyName()
          }
        ]
      } );
    },
    [ dispatch, editChannel, renameChannel, duplicateChannel, removeChannel, copyName ]
  );

  return (
    <Root
      ref={ refRoot }
      className={ className }
      onMouseDown={ handleMouseDown }
      onClick={ handleClick }
      onContextMenu={ handleContextMenu }
      isSelected={ isSelected }
      data-stalker={ name }
    >
      <Name
        ref={ refText }
        style={ {
          transform: `scaleX(${ scale })`
        } }
      >
        <NameSmall>{ nameSmall }</NameSmall><NameBig>{ nameBig }</NameBig>
      </Name>
      {
        status != null
          ? <StatusIcon status={ status } />
          : <StyledValue name={ name } />
      }
    </Root>
  );
};

export { ChannelListEntry };
