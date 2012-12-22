# Executing Untrusted Code Safely

For my [online judge](/project/westviewcoders.org), I have a sandbox environment where I can execute untrusted code safely to grade solution submissions. Since I accept C/C++ code, the code if ran as a normal user could access any process, kill processes, open sockets, read/write to the file system, and possibly escalate privileges. There are a few ways to protect yourself from this.





### Chroot Jail

One of the most effective ways would be to isolate the binary in a chroot jail. This isolates the binary into it's own "filesystem", and the code should theoretically not be able to escape, unless we left the binary running as root. For example, before I `fork()/execve()` into the target process, I could `chdir()`, `chroot()`, then drop permissions. The process would think that it's running in `/`.


    \cpp
    /* change to chroot dir */
    if (0 != chdir(chroot_dir))
    {
    	kill (getpid (), SIGPIPE);
    	error ("Cannot change to chroot dir");
    }
    /* chroot to judge dir  */
    if (0 != chroot(chroot_dir))
    {
    	kill (getpid (), SIGPIPE);
    	error ("Cannot chroot");
    }


### ptrace

ptrace is the built in debugging library on *nix. When a program makes a system call, an interrupt is generated so the call can go to the kernel. ptrace allows us to intercept these calls like this. When the kernel gets a system call, it looks in a system call table and dispatches the call to the right function. When a userland program calls it, it stores the index in `EAX`.

When the program breaks, we can read the `EAX` register and match it against a list of banned system calls. If it matches, we kill the child process and report an illegal system call to the grader.


### Dropping permissions

We can drop permissions to a lower level by setting the user id and group id. This helps to prevent the program from breaking out of the chroot jail.



More to come about sockets....