# Android Facebook Messaging Analytics

For the past five days I've been working on an open source Android application for
analyzing your Facebook messaging data. I tried to follow the Android UI guidelines
as closely as possible and even emulated Google's new card interface! Here's a couple of screenshots:

<photo cloudinary src="a_z1rgtr.png">Daytime activity</photo>

<!--more-->

<photo cloudinary src="b_lg3llw.png">Overview card</photo>
<photo cloudinary src="c_dbse7z.png">Character distribution</photo>
<photo cloudinary src="d_h6d0pn.png">Most active days</photo>
<photo cloudinary src="e_qk9d0s.png">Activity at night</photo>
<photo cloudinary src="f_eiuuoq.png">Message trends over time</photo>
<photo cloudinary src="g_ffy6cr.png">More trends over time</photo>
<photo cloudinary src="h_vduduk.png">Mobile activity</photo>

## Technical details

The "Cards UI" is essentially a custom `ListView` with a large transparent separator.
The border is rendered through a ninepatch generated from a screenshot. Since I thought the current
free android graphing libraries are lacking in the visuals department, I created my own
graph library based off of `HoloGraphLibrary`, which currently supports bar, pie, and line charts.

## Ending notes

In these couple of days I've learned so much more about android programming. As a result, my code
from the beginning of the project is much less than optimal since I didn't know much about the Android API.
However, the source code will still be available! After I prepare and finalize it, you'll find it [here](http://github.com/scen/)!