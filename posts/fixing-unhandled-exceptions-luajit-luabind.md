# Fixing Unhandled Exceptions in LuaJIT/Luabind

I've been frustrated for a while because using LuaJIT with Luabind didn't let me catch exceptions from Lua runtime errors, even though I was using a catchall:


    \cpp
    try
    {
        luabind::call_function<void>(obj);
    }
    catch(...)
    {
    }    


Other people seemed to have this issue but no one actually posted a solution. I stepped through the code many times but it seemed that the code would just skip my exception handler. I remembered I included the files through an `extern "C"` declaration so I decided to try to change my compile settings to `/EHs`, which ended up working.

That's really weird because my non-LuaJIT headers were still included within an `extern "C"` declaration, yet the exceptions were being handled fine.