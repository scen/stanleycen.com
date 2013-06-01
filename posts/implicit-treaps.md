# Implicit Treaps

An implicit treap refers to an array that is implicitly defined and implemented using a treap data structure. It supports online insertion, deletion, and access in logarithmic time. It also lets us query an objective function on any interval `[a, b]` by storing a value at every single node.

To be able to randomly access any element, we store the size of the subtree at every node. This way, we can binary search for the given node by discarding half of the subtree every single step. 

Element insertion and removal relies on the binary search tree's `split` and `merge` methods. `split` recursivelhy splits the tree into two two binary search trees `L` and `R`. `L` contains all the nodes less than a given key, and `R` contains all the nodes larger than or equal to a given key. Using this function, we can retrieve the interval [a, b] by splitting the initial tree into `L` and `R` at `a`, then we can split `R` at `b - a + 1` to retrieve the rest of the interval. 
