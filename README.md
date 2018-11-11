# Notendo Tunes

Notendo Tunes is our attempt at creating a virtual theremin in the browser. Of
course, that would be too easy, so we've made it controllable using Nintendo
JoyCons. Cause that sounded like a fun idea at 2pm before we started work.

As it turns out, getting JoyCons to work in the browser is actually not very
easy (surprise, surprise). So, we hacked an existing driver to interpret motion
controls and present them to the Web Gamepad API.

In the browser we have a Web Audio API generating sounds and an HTML5 canvas
displaying visualisations. And somehow it all works. Barely...

## Team

The team that worked on this was:
- [Will Russell](https://github.com/wrussell1999)
- [Daniel Spencer](https://github.com/danielfspencer)
- [Justin Chadwell](https://github.com/jedevc)

## Tools

The project was developed in HTML5 and Go. We used webpack as a build system,
and heavily utilized the javascript audio and game controller APIs. We also
used the HTML5 canvas for the visualisations.

We heavily hacked the joycon driver so that we could use the motion controls in
the browser. The driver for the joycons was originally developed by [Kane
York](https://github.com/riking) [here](https://github.com/riking/joycon).

## Development

To install the project:

	$ git clone https://github.com/jedevc/hack-aston.git
	$ cd hack-aston
	$ npm install

To test the project:

	$ npm run start

The server will then be listening on port 8080.
