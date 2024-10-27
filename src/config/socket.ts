
import {io} from "socket.io-client"
import { URL } from "./constants"
const socket= io(URL)
export default socket