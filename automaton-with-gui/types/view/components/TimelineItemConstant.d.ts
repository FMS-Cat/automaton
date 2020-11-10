/// <reference types="react" />
import { Resolution } from '../utils/Resolution';
import { TimeValueRange } from '../utils/TimeValueRange';
import type { StateChannelItem } from '../../types/StateChannelItem';
export interface TimelineItemConstantProps {
    channel: string;
    item: StateChannelItem;
    range: TimeValueRange;
    size: Resolution;
    dopeSheetMode?: boolean;
}
declare const TimelineItemConstant: (props: TimelineItemConstantProps) => JSX.Element;
export { TimelineItemConstant };