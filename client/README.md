
Current method for getting a VNC session to test connecting to:

- Have `vncserver`, `x11vnc`, `websockify` installed.

- Run `vncserver` to create a display to connect to.

- Run `x11vnc -display :1 -forever` to connect to start VNC server on port 5900 connected to new display (necessary to have this and above?).

- Run `websockify localhost:6080 localhost:5900` to wrap this with a websocket on port 6080.
