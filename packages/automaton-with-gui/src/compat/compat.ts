import { SerializedAutomatonWithGUI, defaultDataWithGUI } from '../types/SerializedAutomatonWithGUI';
import { jsonCopy } from '../utils/jsonCopy';
import { v1Compat } from './v1Compat';
import { v2Compat } from './v2Compat';
import { v3Compat } from './v3Compat';

export function compat( data?: any ): SerializedAutomatonWithGUI {
  if ( !data ) {
    return jsonCopy( defaultDataWithGUI );
  }

  let newData;
  if ( typeof data === 'object' ) {
    newData = jsonCopy( data );
  } else {
    console.error( 'Loaded data is invalid' );
    return jsonCopy( defaultDataWithGUI );
  }

  let version = parseFloat( newData.version ) || parseFloat( newData.v );

  if ( !version && !newData.rev ) {
    // assuming it's latest
    return newData;
  }

  if ( newData.rev ) { // fuck
    version = 1.0;
    delete newData.rev;
  }

  if ( version < 2.0 ) { // v1, modes and modifiers, CURSED
    newData = v1Compat( newData );
  }

  if ( version < 3.0 ) { // v2
    newData = v2Compat( newData );
  }

  if ( version < 4.0 ) { // v3
    newData = v3Compat( newData );
  }

  return newData;
}
