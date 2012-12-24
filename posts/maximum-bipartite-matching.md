# Maximum Bipartite Matching

In USACO, many problems can be reduced to a bipartite graph. Although finding a maximum matching in any graph is an NP-hard problem, finding a maximum matching in a bipartite graph requires an application of the max-flow algorithm.

We'll be taking a look at [USACO November 2011 Gold Problem #3](http://usaco.org/index.php?page=viewproblem2&cpid=93) as a case study.

This problem can be reduced to a maximum matching problem. WLOG, we'll place the horizontal lines in the left set, and the vertical lines into the right set. We will then draw an edge between a horizontal and vertical line iff they intersect.




Since a maximum flow algorithm takes time to implement, taking into consideration the shape of the graph, we can reduce the complexity of the implementation. These following variables are declared:


    \cpp
    int N; //total # of lines
    struct line{
    	int x1, y1, x2, y2;
    };
    vector<line> hor, vert; //Horizontal and Vertical lines
    int vmatch[300]; //vmatch[i] represents a connection between vert line i and a horizontal line, -1 = SENTINEL
    int hmatch[300]; //hmatch[i] represents a connection between horiz line i and a vertical line, -1 = SENTINEL
    bool vis[300]; //vis[i] = whether we've visited horizontal line i yet


Given these values, we can find the maximum matching with a variation of Kuhn's Algorithm, described thoroughly on TopCoder.


    \cpp
    bool find_match(int at)
    {
    	//printf("FindMatch %dn", at);
    	if (vis[at]) return false;
    	vis[at] = true;
    	for (int i = 0; i < adj[at].size(); i++)
    	{
    		int to = adj[at][i];
    		if (vmatch[to] == -1 || find_match(vmatch[to]))
    		{
    			vmatch[to] = at;
    			hmatch[at] = to;
    			return true;
    		}
    	}
    	return false;
    }
    
    memset(vmatch, -1, sizeof(vmatch));
    memset(hmatch, -1, sizeof(hmatch));
    bool path = false; //whether we were able to augment a path
    int ans = 0; //# edges in matching
    do
    {
    	memset(vis, 0, sizeof(vis));
    	path = false;
    	for (int i = 0; i < hor.size(); i++)
    		if (hmatch[i] < 0 && !vis[i])
    		{
    			bool ret = find_match(i);
    			ans += ret;
    			path |= ret;
    		}
    } while (path);
    fprintf(fout, "%dn", N-ans);