import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { getDomain } from 'helpers/getDomain';

/*
 * @brief global websocket client
 */
export const stompClient = Stomp.over(new SockJS(`${getDomain()}/websocket`));