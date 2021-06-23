已同步[力扣](https://leetcode-cn.com/problems/beautiful-array/solution/932-piao-liang-shu-zu-fen-zhi-si-xiang-g-1xxg/)

### 思路

需要亿点点数学知识……

1. 题目要求不能让该等式成立：A[k] \* 2 = A[i] + A[j]，i < k < j，可知等式左边必为偶数，只要右边和为奇数即可保证不成立
2. 可知 奇数 + 偶数 = 奇数，那就让 A[i]和 A[j]一个为奇数一个为偶数即可，不妨让 A[i]为奇数，A[j]为偶数
3. 也就是我们要新建一个数组，数组长度为 N，所有奇数都在前半部分，所有偶数都在后半部分，但并不是简单的奇偶的堆砌，比如[1, 3, 5, 2, 4]这样是不对的，可以看后面的解释
4. 还有要用到的数学知识是，如果一个数组是漂亮数组，那么其线性变换之后的数组也是漂亮数组，即如果[x1, x2, x3]是一个漂亮数组，则[k * x1 + b, k * x2 + b, k * x3 + b] 也一定是漂亮数组。这是本题能用分治思想的核心所在，也蛮好证明的：
   对 A[k] _ 2 = A[i] + A[j] 中的 A[k]、A[i]、A[j]线性变换
   (k _ A[k] + b) _ 2= k _ A[i] + b + k _ A[j] + b
   => k _ A[k] _ 2+ 2b = k _ A[i] + k _ A[j] + 2b
   两边同时减掉 2b，并除以 k 可得
   =>A[k] _ 2= A[i] + A[j]
   而 A[k] _ 2 = A[i] + A[j] 不成立，因此(k _ A[k] + b) _ 2= k _ A[i] + b + k \* A[j] + b 也不成立
5. 对于从 1 到 N 的所有整数，奇数个数为 (N + 1) / 2，偶数个数为 N / 2
   - 对于从 1 到(N + 1)/2 的所有整数 x，得出其漂亮数组，并映射成 1 到 N 范围的所有奇数 2 \* x - 1
   - 对于从 1 到 N/2 的所有整数 x，得出其漂亮数组，并映射成 1 到 N 范围的所有偶数 2 \* x
6. 而从 1 到(N + 1)/2 以及从 1 到 N/2 范围的漂亮数组，则是进一步递归得到的。显然这里会出现重复需要计算的漂亮数组，比如 N = 10 时，奇偶都需要计算从 1 到 5 范围的漂亮数组，因此可以启用哈希表记忆，哈希表的 key 记录漂亮数组大小 N，value 记录漂亮数组
   > 到这里应当可以明白前面讲的并不是简单的奇偶堆砌是什么意思，就是每一层递归都要满足前奇后偶，一个数在某一层可能是奇数，到下一层可能因为线性变换变成了偶数，但是线性变换并不会改变漂亮数组的成立事实，只要每一层都满足条件，最后的结果也一定满足条件

### 代码(Python3)

```Python3 []
class Solution:
    def beautifulArray(self, N: int) -> List[int]:
        memo = {1 : [1]}
        def f(N):
            if N not in memo:
                memo[N] = [2 * x - 1 for x in f((N + 1) // 2)] + [2 * x for x in f(N // 2)]
            return memo[N]
        return f(N)
```

### 代码(Java)

```Java []
class Solution {
    Map<Integer, int[]> memo;
    public int[] beautifulArray(int N) {
        memo = new HashMap<>();
        memo.put(1, new int[]{1});
        return f(N);
    }

    private int[] f(int N){
        if(!memo.containsKey(N)){
            int index = 0;
            int[] res = new int[N];
            for(int x : f((N + 1) / 2)){
                res[index++] = 2 * x - 1;
            }
            for(int x : f(N / 2)){
                res[index++] = 2 * x;
            }
            memo.put(N, res);
        }
        return memo.get(N);
    }
}
```

**复杂度分析**

- 时间复杂度：O(nlogn)，f(N)调用 logn 次，每次时间消耗 O(n)
- 空间复杂度：O(nlogn)，f(N)调用 logn 次形成大小为 logn 的递归栈，每次需要长度为 n 的数组存储结果
