// Import socket.io
import io from "socket.io-client";

// Export connection
export const socket = io.connect("http://localhost:4000");
