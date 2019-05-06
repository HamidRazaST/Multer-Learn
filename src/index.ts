import Server from './Server';
import { config } from './config';

const server: Server = new Server(config);
server.bootstrap().run();
