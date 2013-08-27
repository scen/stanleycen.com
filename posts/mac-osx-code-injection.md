# Mac OS X Code Injection and Reverse Engineering

It turns out that injecting arbitrary native code into a process on OS X is almost as easy
as it is on Windows. I wrote a small utility based on the *rentzsch/mach_star* project called [osxinj](/project/osxinj) which allows a user to inject a *.dylib* module into any running process. I also created [libembryo](/project/libembryo), a reverse engineering library for OS X.


### Code injection
<photo cloudinary src="osxinj_yaxs7x.png">Injection logs</photo>



Essentially, we manually map some bootstrapping code into the target process
that will then invoke *dyld* to load our module. In preparation,
we first allocate a stack for the thread we'll eventually create in the target process and resolve all relative jump offsets. Since 32-bit jumps are relative, the operating system fixes these relative jumps when the module is not loaded at its preferred base address.
We can fix these by looking at other segments in the Mach-O binary, namely
`__jump_table` and/or `__symbol_stub`. Then, we alter the jump table in these
sections by shifting each address by the module offset.

After working bootstrap code is written to the target process, we pass our module's path and start a thread at the code base. The bootstrap code calls `dlopen` on the module path and *dyld* takes over by invoking the dylib's constructor. 

### Reverse engineering

Similar to my [ionlib](/project/ionlib) project for Win32, [libembryo](/project/libembryo) is a
RE library for OS X. The interfaces should be cleaner and it supports many of the same features.
Using this library, I wrote a program that can draw on any source engine/OpenGL application.
The debug log is shown below.

<photo cloudinary src="source_log_kbi3ny.png">Source engine logs</photo>