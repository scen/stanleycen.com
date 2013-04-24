# Implicit Treaps

An implicit treap refers to an array that is implicitly defined and implemented using a treap data structure. It supports online insertion, deletion, and access in logarithmic time. It also lets us query an objective function on any interval `[a, b]` by storing a value at every single node.

To be able to randomly access any element, we store the size of the subtree at every node. This way, we can binary search for the given node by discarding half of the subtree every single step. 



