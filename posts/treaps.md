# Treaps

During a contest one has to balance program efficiency and coding efficiency. So when the task requires a self-balancing binary search tree, many times people will implement a red-black tree or an AVL tree.

However, these data structures are ridiculously difficult to implement correctly and have many tricky cases to deal with. Many times the guaranteed `2 * log(n + 1)` upper-bound on the height of an RB-tree is unnecessary for a contest problem.

One beautiful data structure offers the perfect balance between efficiency and implementation effort: the *Treap*. The treap is a randomized data structure, and as the name suggests, is both a heap and a binary search tree. Each node stores two keys: a heap key (usually randomized or is a hash) and a tree key. Looking at the heap keys we see a heap (WLOG it's a max-heap); that is, each node has a heap key that is larger than its children's heap keys. Looking at the tree keys we see a binary search tree. Skipping all the theory, the expected height of the tree is proportional to `log n` which means most tree operations like `insert`, `find`, `remove`, `split`, and `merge` run in logarithmic time.


### Insertion

One way to insert a node is to ignore the heap keys at first. We insert the node where it should be according to the tree keys, then rotate the tree until the heap property is restored. Note that tree rotations maintain the in-order invariant.


    \cpp
    void insert(node *& n, int key)
    {
    	if (n == null)
    	{
    		n = createNode(key);
    		return;
    	}
    	if (key < n->key)
    	{
    		insert(n->l, key);
    		if (n->l->hkey > n->hkey)
    			rotateRight(n);
    	}
    	else
    	{
    		insert(n->r, key);
    		if (n->r->hkey > n->hkey)
    			rotateLeft(n);
    	}
    	update(n);
    }


### Deletion

We delete a node as normal. If it has no children we simply remove it. If it has one child, we replace the node with the child. Otherwise we pick the child with the higher heap key, rotate the tree, and recursively delete the node in whatever branch the it ends up in (caused by the tree rotation).


    \cpp
    void remove(node *& n, int key)
    {
    	if (n == null) return;
    	if (n->key == key)
    	{
    		if (n->l == null && n->r == null)
    		{
    			delete n;
    			n = null;
    			return;
    		}
    		if (n->l->hkey > n->r->hkey)
    		{
    			rotateRight(n);
    			remove(n->r, key);
    		}
    		else
    		{
    			rotateLeft(n);
    			remove(n->l, key);
    		}
    	}
    	else if (key < n->key)
    	{
    		remove(n->l, key);
    	}
    	else
    	{
    		remove(n->r, key);
    	}
    	update(n);
    }


### Closing thoughts

My treap implementation pretty short and I can code it almost perfectly on my first try. There are no tricky cases to remember: in fact, the addition of heap constraint simplifies the problem, as there is only one valid ordering for a set of heap keys and tree keys. Treaps can be used to implement a variety of other data structures including range trees, interval trees, order statistics trees, link cut trees, etc...