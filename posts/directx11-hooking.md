# DirectX 11 Hooking

After my bout with reverse engineering with the Source Engine, and reverse engineering various aspects of it, I've decided to move on to more general `D3D11` hooking, which probably will be the next most commonly used DirectX API, like DirectX 9 was. (DirectX 10 was a failure.)

Although I have experience with DirectX 9 hooking and rendering, DirectX 11 turned out to be completely different. Instead of having built in font and line interfaces, a person would have to either build his own, or use external libraries. For font rendering I used [FW1FontWrapper](http://fw1.codeplex.com/), but I wrote my own interfaces for drawing some primitives such as lines and rectangles.

There isn't much documentation on `D3D11` hooking, so I was on my own a lot of the time. Turns out there's two main functions you can hook for rendering, although there are plenty more. The first one is `IDXGISwapChain::Present`, and the other is `ID3D11Device::ClearRenderTargetView`. I chose to go with doing a Virtual Method Table hook on `IDXGISwapChain::Present`, which should be undetected because it resides in `dxgi.dll`, which PB or VAC does not scan anyways.

<!--more-->


I have two methods for retrieving a pointer to `m_pSwapChain`:

1. Place a `JMP` detour on `ID3D11Device::D3D11CreateDeviceAndSwapChain`, and VMT hook the swapChain passed into the function. (Make sure you retarget the relative jump)
2. However, games do not necessarily call `D3D11CreateDeviceAndSwapChain` (they call something else, I can't remember what at this moment, but calling that something else will result in a call to `D3D11CreateDeviceAndSwapChain` with a `NULL` pointer to the `swapChain`. The other method is to detour `CreateDXGIFactory` and `CreateDXGIFactory1`, then once that gets called, you detour `CreateSwapChain`. Then you can retrieve the `SwapChain` from there, and do a VMT hook on the `8th` function.



To be continued...