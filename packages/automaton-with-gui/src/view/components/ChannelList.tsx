import { ChannelListEntry } from './ChannelListEntry';
import { Colors } from '../constants/Colors';
import { Icons } from '../icons/Icons';
import { useDispatch, useSelector } from '../states/store';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

// == styles =======================================================================================
const NewChannelIcon = styled.img`
  fill: ${ Colors.gray };
  height: 16px;
`;

const NewChannelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18px;
  margin: 2px 0;
  cursor: pointer;
  background: ${ Colors.back3 };

  &:active {
    background: ${ Colors.back4 };
  }
`;

const StyledChannelListEntry = styled( ChannelListEntry )`
  width: 100%;
  margin: 2px 0;
  cursor: pointer;
`;

const Root = styled.div`
`;

// == element ======================================================================================
export interface ChannelListProps {
  className?: string;
  refScrollTop: React.RefObject<number>;
}

const ChannelList = ( { className, refScrollTop }: ChannelListProps ): JSX.Element => {
  const dispatch = useDispatch();
  const {
    automaton,
    channelNames
  } = useSelector( ( state ) => ( {
    automaton: state.automaton.instance,
    channelNames: state.automaton.channelNames
  } ) );

  const handleClickNewChannel = useCallback(
    ( event: React.MouseEvent ) => {
      if ( !automaton ) { return; }

      dispatch( {
        type: 'TextPrompt/Open',
        position: { x: event.clientX, y: event.clientY },
        placeholder: 'Name for the new channel',
        checkValid: ( name ) => {
          if ( name === '' ) { return 'Create Channel: Name cannot be empty.'; }
          if ( automaton.getChannel( name ) != null ) { return 'Create Channel: A channel for the given name already exists.'; }
          return null;
        },
        callback: ( name ) => {
          automaton.createChannel( name );

          dispatch( {
            type: 'Timeline/SelectChannel',
            channel: name
          } );

          dispatch( {
            type: 'History/Push',
            description: `Create Channel: ${ name }`,
            commands: [
              {
                type: 'automaton/createChannel',
                channel: name,
              }
            ]
          } );
        }
      } );
    },
    [ automaton, dispatch ]
  );

  const entries = useMemo(
    () => (
      channelNames.map( ( channel ) => (
        <StyledChannelListEntry
          key={ channel }
          name={ channel }
          refScrollTop={ refScrollTop }
        />
      ) )
    ),
    [ channelNames, refScrollTop ]
  );

  return (
    <Root className={ className }>
      { entries }
      <NewChannelButton
        data-stalker="Create a new channel"
        onClick={ handleClickNewChannel }
      >
        <NewChannelIcon as={ Icons.Plus } />
      </NewChannelButton>
    </Root>
  );
};

export { ChannelList };
