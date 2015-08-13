# Tries

In order to solve the USACO December 2008 Gold Contest's #2 efficiently, I had to use a special data structure called a trie. Tries are very useful for storing dictionaries, as querying to see if a word exists takes `O(m)` time, where m is the length of the word.

The node does not store the word itself - the word is inferred by the position of the vertex. (The edges contain the letters)

<!--more-->

A node should look something like this:


```cpp
struct node
{
	int words, prefixes;
	node* l, *r; //or more: node* edges[26];
};
```


From this, one can define a recursive or iterative routine to insert and query for a given word.

Here is my solution for the problem (it uses the iterative version):


```cpp
#include <cstdio>
#include <vector>
#include <cmath>
#include <climits>
#include <ctime>
#include <cstring>
#include <cmath>
#include <queue>
#include <algorithm>
#include <cstdlib>
#include <string>
#include <iostream>
#define dprintf if(debug)printf
using namespace std;

static bool debug = false;

struct node
{
	int words, prefixes;
	node* l, *r;
};
node* nn()
{
	node* ptr = new node(); memset(ptr, 0, sizeof(ptr));
	return ptr;
}
node* root;

int main(int argc,char *argv[]) {
	FILE *fin = fopen("sec.in", "r");
	FILE *fout = fopen("sec.out", "w");
	if (argc>1) debug=true;
	if(debug) fout=stdout;
	int M, N;
	fscanf(fin, "%d %d", &M, &N);
	root = nn();
	for (int i = 0; i < M; i++)
	{
		int b;
		fscanf(fin, "%d", &b);
		node* at = root;
		for (int j = 0; j < b; j++)
		{
			int t;
			fscanf(fin, "%d", &t);
			if (t)
			{
				if (!at->r) at->r = nn();
				at = at->r;
			}
			else
			{
				if (!at->l) at->l = nn();
				at = at->l;
			}
			at->prefixes ++;
		}
		at->words++;
	}
	for (int i = 0; i < N; i++)
	{
		int c, t;
		int ans = 0;
		node* at = root;
		fscanf(fin, "%d", &c);
		int j;
		for (j = 0; j < c; j++)
		{
			fscanf(fin, "%d", &t);
			if (!at) continue;
			ans += at->words;
			if (t)at=at->r;
			else at=at->l;
		}
		if (at)ans+=at->prefixes;
		fprintf(fout, "%dn", ans);
	}
	return 0;
}
```