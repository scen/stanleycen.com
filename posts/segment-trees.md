# Segment Trees

#### *Basic seg-trees allow for two operations:*

1. Toggle values in a given range
2. Output a aggregate characteristic of a given range

In general, it splits up each interval into two non-overlapping sub-intervals, all the way until an interval becomes `[a, a]`. Since it is arranged like a binary tree, querying takes `O(log n)` time. Naive updating can take up to `O(n)` time, but using a technique called lazy propagation, we can bring down time complexity to `O(log n)` too.

<!--more-->

The idea behind seg-trees is that any given interval can be broken up into sub-intervals. In fact, in a seg-tree of size N, each interval consists of _at most_ `2 * log(N)` sub-intervals.

Seg-trees are arranged like heap, so in an array, index 1 is the root, and the left and right nodes can be defined as:


```cpp
inline int left(int x) {return x<<1;}
inline int right(int x){return (x<<1)+1;}
```

So a query operation would look something like this (without lazy propagation implemented):


```cpp
/*
 * lb = lower bound of current node
 * ub = upper bound of current node
 * low = lower bound of given interval
 * high = upper bound of given interval
 * at = current node's ID
*/
int query(int lb, int ub, int low, int high, int at)
{
	if (lb > ub) return 0; //not valid interval
	if (lb > high || ub < low) return 0; //not in range
	if (lb >= low && ub <= high)
	{
		return val[at];
	}
	return query(lb, (lb+ub)>>1, low, high, left(at)) + query(((lb+ub)>>1)+1, ub, low, high, right(at));
}
```


This is good and all, but updating would still take up to `O(n)` time. Lazy propagation solves our problems. When we need to update an interval, we update it and do not update it's children (unlike the naive method). We set a flag on that node, so when we next encounter that node, we push the update flag to it's children, and proceed to update it's children. This technique brings down the complexity of update to `O(log n)`, but it requires us the tweak our query routine a bit.

Update with lazy propagation:


```cpp
void update(int lb, int ub, int low, int high, int at)
{
	if (lb > ub) return; //not a valid interval

	if (flip[at] & 1) val[at] = ub - lb + 1 - val[at]; //if it's odd, faster than %
	flip[at] = 0;
	flip[left(at)] += push[at];
	flip[right(at)] += push[at];
	push[left(at)] += push[at];
	push[right(at)] += push[at];
	push[at] = 0;

	if (lb > high || ub < low) return; //not in range

	if (lb>=low && ub <= high)
	{
		val[at] = ub - lb + 1 - val[at];
		push[at] ++;
		return;
	}
	update(lb, (lb+ub)>>1, low, high, left(at));
	update(((lb+ub)>>1)+1, ub, low, high, right(at));
	val[at] = val[left(at)] + val[right(at)];
}
```


Corresponding `query` with lazy propagation:


```cpp
int query(int lb, int ub, int low, int high, int at)
{
	if (lb > ub) return 0; //not valid interval
	if (lb > high || ub < low) return 0; //not in range

	if (flip[at] & 1) val[at] = ub - lb + 1 - val[at];//if it's odd, faster than %
	flip[at] = 0;
	flip[left(at)] += push[at];
	flip[right(at)] += push[at];
	push[left(at)] += push[at];
	push[right(at)] += push[at];
	push[at] = 0;

	if (lb >= low && ub <= high)
	{
		return val[at];
	}
	return query(lb, (lb+ub)>>1, low, high, left(at)) + query(((lb+ub)>>1)+1, ub, low, high, right(at));
}
```