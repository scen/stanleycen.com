# Binary Indexed Trees

One very useful data structure is the binary indexed tree. Binary Indexed Trees allow us to update and query in `O(log n)` time.

Two basic queries are supported:

1. Update value at position `i`
2. Sum values from `0...i`

### Corresponding code


    \cpp
    #include <cstdio>
    
    #define MAXN 100000
    
    int tree[MAXN+1];
    
    //Read gives the sum from 1 ... idx
    int read(int idx)
    {
        int sum = 0;
        while (idx)
        {
            sum += tree[idx];
            idx -= (idx & -idx);
        }
        return sum;
    }
    
    //Update() updates the value at idx
    void update(int idx, int val)
    {
        while (idx <= MAXN)
        {
            tree[idx] += val;
            idx += (idx & -idx);
        }
    }
    
    //Instead of doing read(idx) - read(idx-1), which is 2 * O(logn)
    int readSingle(int idx){
    	int sum = tree[idx]; 
    	if (idx > 0)
    	{ 
    		int z = idx - (idx & -idx); 
    		idx--; 
    		while (idx != z){ 
    			sum -= tree[idx]; 
    			idx -= (idx & -idx);
    		}
    	}
    	return sum;
    }
    int main()
    {
        update(100, 42);
        update(232, 46);
        printf("%d", readSingle(100));
        printf("%d", read(232));
        return 0;
    }

