# Embedded Scripting: Javascript vs. Lua

A while back I boiled my considerations for an embedded scripting language for ionlib to 2 options: _Lua_ and _Javascript_.
  
  
The first language I chose was Javascript, because I'm extremely fluent in Javascript and closures, elegance, and variadic arguments are very useful to me.


### Javascript

Looking through the different Javascript engines, I chose V8 due to it's touted speed (being JIT compiled and all), and it's `C++` implementation. Right off the bat, building V8 was a pain in the a** (for VS 2012, at least). After spending a bunch of time toying with compile settings, it compiled and I wrote a simple manager class. Running it resulted in a crash, and after looking into it I found out I needed to use a `v8::Locker` if I was going to use multiple threads, as well as `v8::Isolate`. After painstakingly searching through the lacking "documentation" (more like unanswered mailing list emails), I got an implementation working where I could load the script once. I still didn't get my multi-threaded Isolates to work, but since this was the first scripting language I'd ever embedded, I was ecstatic.

After adding a hot reloading component using `ReadDirectoryChangesW()` and  IO completion ports, I changed the build target from EXE to DLL and injected it into a DX11 test environment I made. Crash. Crashed on CreateThread, with the target worker function being unallocated. Say what? Apparently the presence of the V8 engine was causing a runtime error, in turn causing the DLL to be unloaded before I could attach a debugger to it. Also, triggering a breakpoint using:


    \cpp
    _asm int 3
    //or
    __debugbreak();


simply didn't work.


I turned to my trusty Load Library emulator (manual mapper), which ended up working fine, although after a while the program crashed with an undefined runtime error. At this point I had enough of V8 and moved on to my secondary choice, Lua.


### Lua

I've used Lua in game scripting before but have never delved seriously into it. I heard tons of good stuff about Lua and Luabind, which I built easily with VS 2012, after screwing around with Boost.Build for a while. Within minutes I got my first class exposed to Lua, and quickly ported my file loader from my Javascript manager.

I love the elegance of the Luabind API. For example, I can expose my `ion::render` base class in a few lines:


    \cpp
    luabind::module(L)[
    	luabind::class_<ion::render>("render")
    	.def("renderText", 
    	(void(render::*)(int, const font*, const point&, 
    	const color&, const std::string&))&render::renderText)
    	.def("measureText", (size(render::*)(int, const font*,
    	 const point&, const std::string& ))&render::measureText)
    	.def("createFont", &render::createFont)
    	.def("fillRect", &render::fillRect)
    	.def("outlineRect", &render::outlineRect)
    	.def("fillGradient", &render::fillGradient)
    	.def("renderLine", &render::renderLine)
    ];

I'll be exposing more of my classes later on.

### Conclusion

In the end, even though I come from a strong Javascript background, I prefer Lua in this scenario since it was so easy to embed and bind, as well as the performance being not too far off from Google's V8 Javascript engine. The speed could be increased by using LuaJIT.