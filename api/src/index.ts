import {startApiServer} from './server';
import {scheduleCheckingEveryFiveMinutes} from './service/monitor';

startApiServer();
scheduleCheckingEveryFiveMinutes();
