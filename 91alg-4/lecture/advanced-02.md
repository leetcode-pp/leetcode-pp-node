# 并查集

> 并查集是一种树型的数据结构，用于处理一些不交集（Disjoint Sets）的合并及查询问题。

并查集维护了一个不相交动态集合$S = {S1, S2, ..., Sn}$。我们用集合中的某个元素来代表这个集合，该元素称为集合的代表元。

## 并查集的操作

- MAKE-SET(x): 构建并查集
- UNION(x, y): 合并两个子集
- FIND(x): 确定 x 属于哪个子集

## 并查集的数据表示

并查集元素一般用树来表示，树中的每个节点代表一个成员，每棵树表表示一个集合，多棵树构成一个并查集森林。
每个集合中，树根即其代表元。

```ts
interface Node {
  parent: Node;
}
```

![](../assets/find-union-set/express.png)

## 并查集实现

### MAKE-SET(x)

MAKE-SET, 初始化时，节点的 parent 指向其自身，每个元素都是一棵数，并以自己为代表元。

```
function MAKE-SET(x)
  x.parent = x
```

### FIND-SET(x)

查找 x 元素的代表元，以下是递归查询

```
FIND-SET(x)
  if x != x.parent
    return FIND-SET(x.parent)
  return x.parent
```

### UNION(x, y)

集合合并，分别找到 x, y 的代表元，将其合并，具体表现形式为将 FIND(x).parent 指向 FIND(y)

```
UNION(x, y)
  xRoot = FIND-SET(x)
  yRoot = FIND-SET(y)
  xRoot.parent = yRoot
```

上述并集是最基础的一种表示，n-1 次的 UNION 操作，可能会构造初一棵恰好含有 n 个节点的线性链的树，考虑以下情景
![](../assets/find-union-set/find-union-bad.png)

以下两种启发式的时间优化

1. 按秩合并，这里的秩是指节点的高度，具体操作为将较小秩序的根指向较大秩的根。
   ![](../assets/find-union-set/rank.png)
2. 路径压缩，在 FIND-SET 的时候将节点的 parent 指向代表元也就是树根。
   ![](../assets/find-union-set/path.png)

### 带秩的 UNION 实现

带秩的数据节点表示为

```ts
Node {
  rank: 0,
  parent: Node
}
```

```
UNION(x, y)
  // 将低秩树根指向高秩树根
  if x.rank > y.rank
    y.parent = x
  else
    x.parent = y
  // 如果两个树秩相同
  if (x.rank === y.rank)
    y.rank = y.rank + 1
```

### 路径压缩的 FIND-SET 实现

```
FIND-SET(x)
  if x !== x.parent
    x.parent = FIND-SET(x.parent) // 递归时找到树根代表元，回溯时将当前节点的 parent 指向树根
  return x.parent
```

## 完整代码

### python

#### 不带优化的实现

```python
class UF:
    parent = {}
    cnt = 0
    def __init__(self, M):
        # 初始化 parent 和 cnt

    def find(self, x):
        while x != self.parent[x]:
            x = self.parent[x]
        return x
    def union(self, p, q):
        if self.connected(p, q): return
        self.parent[self.find(p)] = self.find(q)
        self.cnt -= 1
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```

#### 带路径压缩的代码模板

```python
class UF:
    parent = {}
    size = {}
    cnt = 0
    def __init__(self, M):
        # 初始化 parent，size 和 cnt

    def find(self, x):
        while x != self.parent[x]:
            x = self.parent[x]
            # 路径压缩
            self.parent[x] = self.parent[self.parent[x]]
        return x
    def union(self, p, q):
        if self.connected(p, q): return
        # 小的树挂到大的树上， 使树尽量平衡
        leader_p = self.find(p)
        leader_q = self.find(q)
        if self.size[leader_p] < self.size[leader_q]:
            self.parent[leader_p] = leader_q
            self.size[leader_q] += self.size[leader_p]
        else:
            self.parent[leader_q] = leader_p
            self.size[leader_p] += self.size[leader_q]
        self.cnt -= 1
    def connected(self, p, q):
        return self.find(p) == self.find(q)
```

### typescript 实现

```ts
class UF<T> {
  private parents: Map<T, T> = new Map();
  private ranks: Map<T, number> = new Map();

  constructor(values: T[]) {
    this.makeSet(values);
  }

  makeSet(values: T[]) {
    values.forEach((value) => {
      this.parents.set(value, value);
      this.ranks.set(value, 0);
    });
  }

  find(value: T) {
    const parent = this.parents.get(value);
    if (parent === value) {
      return parent;
    }
    this.parents.set(value, this.find(parent));
    return this.parents.get(value);
  }

  union(x: T, y: T) {
    const xRank = this.ranks.get(x);
    const yRank = this.ranks.get(y);
    const xRoot = this.parents.get(x);
    const yRoot = this.parents.get(y);
    if (xRank > yRank) {
      this.parents.set(yRoot, xRoot);
    } else {
      this.parents.set(xRoot, yRoot);
      if (xRank === yRank) {
        this.ranks.set(y, yRank + 1);
      }
    }
  }
}
```

## 带权并查集

实际上并查集就是图结构，我们使用了哈希表来模拟这种图的关系。 而上面讲到的其实都是有向无权图，因此仅仅使用 parent 表示节点关系就可以了。而如果使用的是有向带权图呢？实际上除了维护 parent 这样的节点指向关系，我们还需要维护节点的权重，一个简单的想法是使用另外一个哈希表 weight 存储节点的权重关系。比如 `weight[a] = 1 表示 a 到其父节点的权重是 1`。

如果是带权的并查集，其查询过程的路径压缩以及合并过程会略有不同，因为我们不仅关心节点指向的变更，也关心权重如何更新。比如：

```
a    b
^    ^
|    |
|    |
x    y
```

如上表示的是 x 的父节点是 a，y 的父节点是 b，现在我需要将 x 和 y 进行合并。

```
a    b
^    ^
|    |
|    |
x -> y
```

假设 x 到 a 的权重是 w(xa)，y 到 b 的权重为 w(yb)，x 到 y 的权重是 w(xy)。合并之后会变成如图的样子：

```
a -> b
^    ^
|    |
|    |
x    y
```

那么 a 到 b 的权重应该被更新为什么呢？我们知道 w(xa) + w(ab) = w(xy) + w(yb)，也就是说 a 到 b 的权重 w(ab) = w(xy) + w(yb) - w(xa)。

当然上面关系式是加法，减法，取模还是乘法，除法等完全由题目决定，我这里只是举了一个例子。不管怎么样，这种运算一定需要满足**可传导性**。

### 带路径压缩的代码模板

这里以加法型带权并查集为例，讲述一下代码应该如何书写。

```py
class UF:
    def __init__(self, M):
        # 初始化 parent，weight
        self.parent = {}
        self.weight = {}
        for i in range(M):
            self.parent[i] = i
            self.weight[i] = 0

   def find(self, x):
        if self.parent[x] != x:
            ancestor, w = self.find(self.parent[x])
            self.parent[x] = ancestor
            self.weight[x] += w
        return self.parent[x], self.weight[x]
    def union(self, p, q, dist):
        if self.connected(p, q): return
        leader_p, w_p = self.find(p)
        leader_q, w_q = self.find(q)
        self.parent[leader_p] = leader_q
        self.weight[leader_p] = dist + w_q - w_p
    def connected(self, p, q):
        return self.find(p)[0] == self.find(q)[0]
```

典型题目：

- [399. 除法求值](https://leetcode-cn.com/problems/evaluate-division/)

## 并查集的应用

1. 确定无向图的连通分量
2. 亲戚问题，是否同个祖先
3. 检测图是否有环

思路： 只需要将边进行合并，并在合并之前判断是否已经联通即可，如果合并之前已经联通说明存在环。

代码：

```py
uf = UF()
for a, b in edges:
    if uf.connected(a, b): return False
    uf.union(a, b)
return True
```

题目推荐：

- [684. 冗余连接](https://leetcode-cn.com/problems/redundant-connection/solution/bing-cha-ji-mo-ban-ben-zhi-jiu-shi-jian-0wz2m/)
- [Forest Detection](https://binarysearch.com/problems/Forest-Detection)

4. 最小生成树经典算法 Kruskal

## 推荐下面的题练练手

- [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)
- [1319. 连通网络的操作次数](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/)
- [924. 尽量减少恶意软件的传播](https://leetcode-cn.com/problems/minimize-malware-spread/)
- [928. 尽量减少恶意软件的传播 II](https://leetcode-cn.com/problems/minimize-malware-spread-ii/)

## 参考

1. 算法导论
2. [维基百科](https://zh.wikipedia.org/wiki/%E5%B9%B6%E6%9F%A5%E9%9B%86)
3. [并查集详解 ——图文解说,简单易懂(转)](https://blog.csdn.net/liujian20150808/article/details/50848646)
4. [并查集专题](https://github.com/azl397985856/leetcode/blob/master/thinkings/union-find.md)
